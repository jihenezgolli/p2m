'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">E-shop documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6dfe3c18475fb5bce5536f4afd3979b194dd60d4e63a43f12ce7689ed7b4d0cd689fa6a37d31dcd2c0e7768c926308124e0022886ec839ebbf238c7121833f02"' : 'data-target="#xs-components-links-module-AppModule-6dfe3c18475fb5bce5536f4afd3979b194dd60d4e63a43f12ce7689ed7b4d0cd689fa6a37d31dcd2c0e7768c926308124e0022886ec839ebbf238c7121833f02"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6dfe3c18475fb5bce5536f4afd3979b194dd60d4e63a43f12ce7689ed7b4d0cd689fa6a37d31dcd2c0e7768c926308124e0022886ec839ebbf238c7121833f02"' :
                                            'id="xs-components-links-module-AppModule-6dfe3c18475fb5bce5536f4afd3979b194dd60d4e63a43f12ce7689ed7b4d0cd689fa6a37d31dcd2c0e7768c926308124e0022886ec839ebbf238c7121833f02"' }>
                                            <li class="link">
                                                <a href="components/AccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminRegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminRegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditOrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditOrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditOrderDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditOrderDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditUsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShopComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShopComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UIComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UIComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewOrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewOrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewOrderDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewOrderDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewProductComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CartItems.html" data-type="entity-link" >CartItems</a>
                            </li>
                            <li class="link">
                                <a href="classes/Categories.html" data-type="entity-link" >Categories</a>
                            </li>
                            <li class="link">
                                <a href="classes/Products.html" data-type="entity-link" >Products</a>
                            </li>
                            <li class="link">
                                <a href="classes/Users.html" data-type="entity-link" >Users</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link" >CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserGuard.html" data-type="entity-link" >UserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});