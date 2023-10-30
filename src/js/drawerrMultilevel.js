import Drawerr from './drawerr'
import { maintain } from 'ally.js'

const multilevelSettings = {
  activeSubmenu: false,
  submenus: false,
  links: false,
  navigationTextClass: 'drawerr-navigation',
  hasSubmenuClass: 'drawerr-item-has-submenu',
  submenuClass: 'drawerr-submenu',
  submenuActiveClass: 'drawerr-submenu--active',
  navigationContainerClass: 'drawerr-navigation-container',
  hiddenClass: 'hidden',
  noHashLinkClass: 'drawer-item-hashlink',
  subMenuLinkClass: 'drawerr-submenu-link'
}

const multilevelOptions = {
  navigationText: 'MENU',
  toggleBtnAriaLabel: 'navigation',
  closeMenuBtnLabel: 'Close menu',
  showOnLoad: false
}

export default class DrawerrMultilevel extends Drawerr {
  constructor (args) {
    super(args)

    const { navigationText, toggleBtnAriaLabel, closeMenuBtnLabel, showOnLoad } = multilevelOptions

    this.options.navigationText =
      args.navigationText || navigationText
    this.options.toggleBtnAriaLabel = args.toggleBtnAriaLabel || toggleBtnAriaLabel
    this.options.closeMenuBtnLabel = args.closeMenuBtnLabel || closeMenuBtnLabel
    this.options.showOnLoad = args.showOnLoad || showOnLoad

    this.multilevelSettings = multilevelSettings
    this.drawerr.classList.add('drawerr-multilevel')
    this.tabHandle = false

    // All links inside drawerr
    this.links = this.drawerr.querySelectorAll('a')

    // Setup navigation
    this.insertNavigation()
    this.insertCloseMenu()
    this.navigation = document.querySelector(
      `.${this.multilevelSettings.navigationTextClass}`
    )

    this.navigationText = this.navigation.querySelector(
      `.${this.multilevelSettings.navigationTextClass}__text`
    )
    this.navigationIcon = document.querySelector(
      `.${this.multilevelSettings.navigationTextClass}__icon`
    )

    // Links
    this.linkActiveClass = 'drawerr-link--active'

    // Submenu's
    this.multilevelSettings.submenus = this.drawerr.querySelectorAll(
      'ul li ul'
    )
    this.addClassToSubmenus()

    // Events
    this.bindLinks()
    this.navigationOnClick()
    this.bindOnClose()

    this.toggleBtn.setAttribute('aria-expanded', 'false')
    this.toggleBtn.setAttribute(
      'aria-label',
      this.options.toggleBtnAriaLabel
    )

    if (this.options.showOnLoad) {
      this.toggleDrawer()
    }
  }

  toggleDrawer () {
    super.toggleDrawer()

    if (this.toggleBtn.classList.contains('drawerr-btn--active')) {
      this.toggleBtn.setAttribute('aria-expanded', 'true')
      this.drawerr.querySelector('ul a').focus()

      if (!this.tabHandle) {
        this.tabHandle = maintain.tabFocus({
          context: '.drawerr-container'
        })
      }
    } else {
      this.removeActiveClassFromLinks()
      this.toggleBtn.setAttribute('aria-expanded', 'false')
      this.multilevelSettings.activeSubmenu = false
      this.toggleBtn.focus()
      this.tabHandle.disengage()
      this.tabHandle = false
    }
  }

  insertNavigation () {
    this.navigationContainer = document.querySelector(
      `.${this.multilevelSettings.navigationContainerClass}`
    )

    if (this.navigationContainer === null) {
      this.navigationContainer = this.drawerr.insertAdjacentHTML(
        'afterbegin',
        `<div class="${
          this.multilevelSettings.navigationContainerClass
        }"></div>`
      )

      this.navigationContainer = document.querySelector(
        `.${this.multilevelSettings.navigationContainerClass}`
      )
    }

    this.navigationContainer.insertAdjacentHTML(
      'afterbegin',
      ` <a tabIndex="-1" class="${
        this.multilevelSettings.navigationTextClass
      }" href="#"><span class="${
        this.multilevelSettings.navigationTextClass
      }__icon ${this.multilevelSettings.hiddenClass}"></span><span class="${
        this.multilevelSettings.navigationTextClass
      }__text">${this.options.navigationText}</span></a>`
    )
  }

  insertCloseMenu () {
    if (this.navigationContainer !== null) {
      this.navigationContainer.insertAdjacentHTML(
        'afterbegin',
        `<button id="js-sr-close-menu" class="sr-only sr-only-focusable">${this.options.closeMenuBtnLabel}</button>`
      )

      this.closeMenuOnClick()
    }
  }

  addClassToSubmenus () {
    Array.prototype.forEach.call(this.multilevelSettings.submenus, menu => {
      menu.classList.add(this.multilevelSettings.submenuClass)
    })
  }

  reset () {
    setTimeout(() => {
      this.removeActiveClassFromSubmenus()
      this.setNavigationText(this.options.navigationText)
      this.hideShowNavigationIcon()
    }, 300)
  }

  bindOnClose () {
    document.addEventListener('drawerr-close', this.reset.bind(this))
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        if (this.drawerr.classList.contains('drawerr--open')) {
          this.toggleDrawer()
        }
      }
    })
  }

  bindLinks () {
    const links = this.drawerr.querySelectorAll('ul a')

    if (links.length) {
      Array.prototype.forEach.call(links, link => {
        const parent = link.parentElement

        if (
          parent.children
            .item(parent.children.length - 1)
            .classList.contains(this.multilevelSettings.submenuClass)
        ) {
          link.classList.add(this.multilevelSettings.hasSubmenuClass)

          if (link.getAttribute('href') !== '#') {
            this.addSubmenuLink(link)
          }
        }

        link.addEventListener('click', this.linkOnClick.bind(this))
      })
    }
  }

  /**
   * Add submenu link to existing link so the original and the submenu can be clicked
   *
   * @param {*} link
   */
  addSubmenuLink (link) {
    const submenuLink = document.createElement('a')
    link.parentElement.classList.add(this.multilevelSettings.noHashLinkClass)
    submenuLink.setAttribute('class', this.multilevelSettings.subMenuLinkClass)

    link.insertAdjacentElement('afterend', submenuLink)

    submenuLink.addEventListener('click', this.linkOnClick.bind(this))
  }

  /**
   *
   * @param {*} e
   */
  linkOnClick (e) {
    const link = e.target
    const submenu = link.parentElement.querySelector(
      `.${this.multilevelSettings.submenuClass}`
    )
    let submenuLink = false
    let breadcrumbText = ''

    this.navigationContainer.scrollIntoView()

    link.classList.add(this.linkActiveClass)

    if (link.classList.contains(this.multilevelSettings.subMenuLinkClass)) {
      // Submenu item has no link but we need to set the breadcrumb text
      submenuLink = link.previousSibling
    }

    if (submenu !== null) {
      if (!submenuLink) {
        breadcrumbText = link.textContent

        // Go to the clicked link url instead of navigating the menu
        if (link.getAttribute('href') !== '#') {
          return false
        }
      } else {
        breadcrumbText = submenuLink.textContent
      }

      // Make navigation tabable to enable `go back` functionality
      this.navigation.setAttribute('tabIndex', 0)

      submenu.classList.add(this.multilevelSettings.submenuActiveClass)
      this.setNavigationText(breadcrumbText)
      this.multilevelSettings.activeSubmenu = submenu

      setTimeout(() => {
        this.multilevelSettings.activeSubmenu.querySelector('li a').focus()
      }, 600)

      this.hideShowNavigationIcon('show')
    }
  }

  navigationOnClick () {
    this.navigation.addEventListener('click', (e) => {
      e.preventDefault()

      if (!this.multilevelSettings.activeSubmenu) return

      this.removeActiveClassFromLinks()

      this.multilevelSettings.activeSubmenu.classList.remove(
        this.multilevelSettings.submenuActiveClass
      )
      this.multilevelSettings.activeSubmenu = this.multilevelSettings.activeSubmenu.parentElement.parentElement

      // Is submenu active? Otherwise we are at root level
      if (
        !this.multilevelSettings.activeSubmenu.classList.contains(
          'drawerr-submenu--active'
        )
      ) {
        this.hideShowNavigationIcon(this.multilevelSettings.hiddenClass)
        this.setNavigationText(this.options.navigationText)
        this.navigation.setAttribute('tabindex', -1)
      } else {
        this.setNavigationText(
          this.multilevelSettings.activeSubmenu.parentElement.querySelector('a')
            .textContent
        )
      }
    })
  }

  closeMenuOnClick () {
    document.querySelector('#js-sr-close-menu').addEventListener('click', () => {
      this.toggleDrawer()
    })
  }

  removeActiveClassFromLinks () {
    if (this.links.length > 0) {
      this.links.forEach(link => {
        link.classList.remove(this.linkActiveClass)
      })
    }
  }

  removeActiveClassFromSubmenus () {
    if (this.multilevelSettings.submenus.length > 0) {
      Array.prototype.forEach.call(this.multilevelSettings.submenus, menu => {
        menu.classList.remove(this.multilevelSettings.submenuActiveClass)
      })
    }
  }

  /**
   *
   * @param {*} text
   */
  setNavigationText (text) {
    this.navigationText.textContent = text
  }

  /**
   *
   * @param {*} action
   */
  hideShowNavigationIcon (action) {
    action === 'show'
      ? this.navigationIcon.classList.remove(
        this.multilevelSettings.hiddenClass
      )
      : this.navigationIcon.classList.add(this.multilevelSettings.hiddenClass)
  }
}
