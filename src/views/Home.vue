<template>
	<transition name="fade" mode="out-in">
		<div v-if="showWizard">
			<CV id="cv_download" style="display: none;"/>
			<!-- Hidden links -->
			<div id="app_page">
				<ul class="hidden-links" id="top" aria-label="Ukryte linki">
					<li>
						<a  href="#wizard">Przejdź do kreatora</a>
					</li>
					<li v-if="clientWidth >= 3"><a href="#preview">Przejdź do podglądu</a></li>
				</ul>

				<header role="heading" aria-label="Banner">
					<h1
						id="header_banner"
						class="
							bg-primary
							text-white text-center text-md-left
							p-4
							d-inline-block
							w-100
						"
					>
						Kreator CV
					</h1>
					<button
						@click="setThemeMode"
						class="btn rounded-circle bi position-absolute text-light shadow"
						:class="[theme === 'light' ? 'bi-sun' : 'bi-moon']"
						style="top: 20px; right: 20px; font-size: 1.5rem"
						:aria-label="themeTitle"
						data-bs-toggle="tooltip"
						data-bs-placement="bottom"
						:title="'Włącz '+themeTitle"
					></button>
				</header>

				<!-- Header navigation section -->
				<div v-if="clientWidth >= 3" aria-label="Nawigacja">
					<!-- Header navigation block -->
					<div
						id="header_navigation"
						class="d-flex position-relative justify-content-evenly my-3 mx-5"
					>
						<!-- Header navigation -->
						<button
							v-for="nav in navigation"
							:key="nav.id"
							@click="changeFormTab(nav.id)"
							class="
								text-center
								w-100
								bg-transparent
								border-0
								header-navigation-button
								py-3
							"
						>
							<span
								:class="[
									buttonClass(nav.id),
									{
										'text-primary':
											nav.id !== currentFormTabIndex,
									},
								]"
								class="
									btn
									border border-2
									rounded-circle
									text-center
									p-3
									text-decoration-none
								"
							>
								<span
									v-if="isDone(nav.id)"
									class="bi bi-check-lg p-1"
								></span>
								<span v-else class="px-2">
									{{ nav.id + 1 }}
								</span>
							</span>
							<span
								class="
									btn
									mt-2
									bg-transparent
									d-block
									border-0
									text-primary
									w-100
								"
								:class="[
									buttonClass(nav.id),
									{ 'fw-bold': currentFormTabIndex === nav.id },
								]"
							>
								{{ nav.title }}
							</span>
						</button>
					</div>
				</div>

				<!-- Main application -->
				<main id="wizard" role="main" aria-label="Kreator" class="d-flex justify-content-evenly mt-4 mb-5">
					<!-- Main section of application -->
					<section
						class="col-11 col-md-6 bg-light p-2 p-md-3 control-panels"
						id="paper"
						role="form"
						:aria-label="'Formularz: '+navigation[currentFormTabIndex].title"
					>
						<component :is="formTabComponent"></component>
						<p v-if="notLastPage" aria-label="Pola oznaczone znakiem * są obowiązkowe" class="p-3">* Pola obowiązkowe</p>

						<!-- Bottom pagination -->
						<div
							v-if="clientWidth >= 3"
							class="
								d-flex
								mt-4
								pt-4
								border-top
								justify-content-evenly
							"
							aria-label="Paginacja"
						>
							<a
								v-if="currentFormTabIndex > 0"
								href="#app_page"
								@click="changeFormTab(currentFormTabIndex - 1)"
								class="
									my-auto
									border-0
									btn
									text-primary
									bg-transparent
									bi bi-chevron-left
								"
								aria-label="Przejdź wstecz"
							>
								Wstecz
							</a>
							<a
								v-if="notLastPage"
								href="#"
								@click="changeFormTab(currentFormTabIndex + 1)"
								class="btn btn-primary px-5 py-2 rounded-pill"
								aria-label="Przejdź dalej"
								>Dalej</a
							>
						</div>
					</section>

					<!-- Preview -->
					<section 
						v-if="clientWidth >= 3" 
						class="col" 
						id="preview-column"
						role="aside"
						aria-label="Podgląd CV"
					>
						<div class="w-100 h-100">
							<div
								type="button"
								id="preview"
								class="position-relative"
							>
								<div
									class="bg-light"
									data-bs-toggle="modal"
									data-bs-target="#previewModal"
									id="preview_tip_area"
									@mouseleave="hidePreviewTip"
									@mouseenter="showPreviewTip"
								>
									<transition name="fade">
										<div
											v-if="shownPreviewTip"
											id="preview_tip_absolute"
											class="h-100 w-100 position-absolute"
										>
											<div id="preview-tip" class="m-auto">
												<div class="m-auto text-center">
													<button
														class="
															btn btn-primary
															bi bi-zoom-in
															rounded-circle
														"
													></button>
													<p>Powiększ podgląd CV</p>
												</div>
											</div>
										</div>
									</transition>
									<CV id="cv_page" class="p-3 bg-light" />
								</div>

								<!-- CV options -->
								<div
									v-show="notLastPage"
									id="cv_options"
									class="w-100 bg-light p-3"
									:class="[
										fix ? 'position-fixed' : 'position-static',
									]"
									:style="[fix ? 'bottom: 0' : '']"
								>
									<div
										class="
											border
											border-start-0
											border-end-0
											border-bottom-0
											py-3
										"
									>
										<div class="row">
											<div class="col-sm-4 col-lg-12 my-auto">
												<h2>Wybierz kolor</h2>
											</div>
											<div class="col-sm-8 col-lg-12 my-auto">
												<div
													v-for="c in colors"
													:key="c.color"
													class="
														d-inline-block
														preview-button-container
													"
												>
													<button
														@click="
															changeActiveColor(c.color)
														"
														class="
															btn
															rounded-circle
															preview-button
														"
														:class="[
															activeColor === c.color
																? 'preview-button-active bi bi-check'
																: 'preview-button',
														]"
														:style="{
															'background-color':
																c.color,
														}"
														:aria-label="c.label"
													></button>
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-sm-4 col-lg-12 my-auto">
												<h2>Styl zdjęcia</h2>
											</div>
											<div class="col-sm-8 col-lg-12 my-auto">
												<div
													class="
														d-inline-block
														preview-button-container
													"
												>
													<button
														@click="
															setPhotoClass(
																'rounded-circle'
															)
														"
														:class="[
															photoClass ===
															'rounded-circle'
																? 'preview-button-active bi bi-check'
																: 'preview-button',
														]"
														class="
															btn btn-primary
															rounded-circle
														"
													></button>
												</div>

												<div
													class="
														d-inline-block
														preview-button-container
													"
												>
													<button
														@click="
															setPhotoClass(
																'img-thumbnail'
															)
														"
														:class="[
															photoClass ===
															'img-thumbnail'
																? 'preview-button-active bi bi-check'
																: 'preview-button',
														]"
														class="btn btn-primary"
														style="border-radius: 30%"
													></button>
												</div>
												<div
													class="
														d-inline-block
														preview-button-container
													"
												>
													<button
														@click="setPhotoClass('')"
														:class="[
															photoClass === ''
																? 'preview-button-active bi bi-check'
																: 'preview-button',
														]"
														class="
															btn btn-primary
															rounded-0
														"
													></button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>

				<!-- Footer -->
				<footer
					role="footer"
					id="footer"
					class="py-4 py-md-5 text-center text-light "
					aria-label="Stopka"
				>
					<span class="d-block" aria-label="Prawa autorskie"
						>CV generator &copy; 2021 Wszelkie prawa zastrzeżone</span
					>
					<a href="#app_page" class="d-block text-decoration-none text-light"
						>Powrót na górę</a
					>
				</footer>

				<!-- bottom navigation -->
				<nav
					v-if="clientWidth < 3"
					id="footer_nav"
					class="
						fixed-bottom
						bg-primary
						text-light
						d-flex
						justify-content-evenly
					"
					role="navigation"
				>
					<button
						@click="changeFormTab(currentFormTabIndex - 1)"
						:class="currentFormTabIndex === 0 ? 'disabled' : ''"
						class="
							btn btn-primary
							rounded-circle
							p-3
							my-2
							text-light
							bi bi-chevron-left
						"
						aria-label="Przejdź wstecz"
					></button>
					<div class="my-auto" role="progressbar" :aria-label="'Strona '+(currentFormTabIndex + 1)+' z '+navigation.length">
						<ul class="m-0 my-auto p-0">
							<li
								v-for="nav in navigation"
								:key="nav.id"
								:class="navDotClass(nav.id)"
								class="nav-dot d-inline-block"
							></li>
						</ul>
					</div>
					<button
						@click="changeFormTab(currentFormTabIndex + 1)"
						:class="currentFormTabIndex === 3 ? 'disabled' : ''"
						class="
							btn btn-primary
							rounded-circle
							p-3
							my-2
							text-light
							bi bi-chevron-right
						"
						aria-label="Przejdź dalej"
					></button>
				</nav>

				<!-- Rounded preview button -->
				<button
					v-if="clientWidth < 3"
					id="cv-preview"
					class="btn btn-info fs-4 rounded-circle bi bi-file-earmark-play"
					data-bs-toggle="modal"
					data-bs-target="#previewModal"
					role="button"
					aria-label="Pokaż podgląd CV"
				></button>

				<!-- CV modal -->
				<div
					class="modal fade"
					id="previewModal"
					tabindex="-1"
					aria-labelledby="previewModalLabel"
					aria-hidden="true"
				>
					<div class="modal-dialog modal-xl modal-fullscreen-lg-down">
						<div class="modal-content">
							<div class="modal-header">
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div id="cv-download" class="modal-body">
								<CV id="cv_pagee" />
							</div>
							<div
								v-if="clientWidth < 3 && !!mobilePreviewTabs"
								class="modal-footer d-flex justify-content-between"
								id="modal_preview_footer"
							>
								<div
									class="d-flex justify-content-between w-100"
									style="z-index: 3"
								>
									<ul class="nav">
										<li
											v-for="tab in mobilePreviewTabs"
											:key="tab.component"
											class="nav-item"
										>
											<button
												@click="
													currentMobilePreviewTab =
														tab.component
												"
												class="
													btn
													modal-mobile-preview-button
												"
												:class="[
													tab.class,
													{
														'modal-mobile-preview-button-active':
															currentMobilePreviewTab ===
															tab.component,
													},
												]"
											>
												<span class="bi d-block"></span>
												{{ tab.name }}
											</button>
										</li>
									</ul>
									<transition name="fade">
										<button
											v-if="currentMobilePreviewTab"
											@click="currentMobilePreviewTab = null"
											class="btn bi bi-x-lg my-auto"
										></button>
									</transition>
								</div>
								<transition name="fade" appear>
									<div
										class="d-block w-100 border-top pt-2"
										v-if="currentMobilePreviewTab"
									>
										<transition
											name="slide-vertical"
											mode="out-in"
										>
											<component
												:is="currentMobilePreviewTab"
											/>
										</transition>
									</div>
								</transition>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Landing page -->
		<div
			v-else
			class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"
		>
			<main class="px-3 m-auto">
				<h1>Kreator CV</h1>
				<p class="lead text-justify">
					Przejdź przez kreator i stwórz CV korzystając z jednego z
					dostępnych szablonów.
				</p>
				<p class="lead">
					<button
						@click="toggleWizard"
						class="
							btn-forward btn btn-lg btn-secondary
							fw-bold
							border-white
							bg-white
							text-dark
							mt-4 mt-ms-5
						"
					>
						Przejdź do kreatora
					</button>
				</p>
			</main>
		</div>
	</transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PrimaryData from "../components/PrimaryData.vue";
import Experience from "../components/Experience.vue";
import Skills from "../components/Skills.vue";
import Download from "../components/Download.vue";
import CV from "../components/CV.vue";
import MobileSetColor from "../components/MobileSetColor.vue";
import MobileSetPhoto from "../components/MobileSetPhoto.vue";

export default {
	name: "Home",
	data() {
		return {
			theme: null,
			themeTitle: null,
			link: null,
			fix: false,
			currentMobilePreviewTab: null,
			mobilePreviewTabs: [
				{
					component: "MobileSetPhoto",
					class: "bi-person-square",
					name: "Zdjęcie",
				},
				{
					component: "MobileSetColor",
					class: "bi-palette",
					name: "Kolor",
				},
			],
			navigation: [
				{ id: 0, title: "Dane podstawowe", component: "PrimaryData" },
				{ id: 1, title: "Doświadczenie", component: "Experience" },
				{ id: 2, title: "Umiejętności", component: "Skills" },
				{ id: 3, title: "Pobierz CV", component: "Download" },
			],
			notLastPage: true,
			currentFormTab: "PrimaryData",
			currentFormTabIndex: 0,
			maxIndex: 0,
			shownPreviewTip: false,
			previewMenu: {
				width: null,
			},
		};
	},

	components: {
		PrimaryData,
		Experience,
		Skills,
		Download,
		CV,
		MobileSetColor,
		MobileSetPhoto,
	},

	created() {
		this.createUser();
		this.doShowWizard(this.showWizard);
		this.colors = this.storeColors;
		this.activeColor = this.storeActiveColor;
		this.getViewportWidth();
		this.theme = localStorage.getItem("theme") || "light";
		let link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = "../../../public/css/dark.css";
		link.id = "dark_mode";
		this.link = link;
		this.setThemeMode();
	},

	mounted() {
		//initial set of footer
		if (document.querySelector('#app_page').clientHeight < window.innerHeight) {
			document.querySelector('footer').style.position = 'absolute';
			document.querySelector('footer').style.width = '100%';
			document.querySelector('footer').style.bottom = 0;
		} else {
			document.querySelector('footer').style.position = 'static';
		}
		window.addEventListener("resize", this.doGetViewportWidth);
		window.addEventListener("scroll", () => {
			if (this.clientWidth >= 3) {
				document.querySelector("#cv_page").style.maxHeight = (document.querySelector('#paper').clientHeight - document.querySelector("#cv_options").clientHeight)+"px";
				document.querySelector("#cv_page").style.overflow = "hidden";

				let cvPage = document.querySelector("#cv_page");
				let cvOptions = document.querySelector("#cv_options");
				let viewport = document.getElementsByTagName("html")[0];
				let previewTip = document.querySelector("#preview");
				let headerHeight =
					document.querySelector("#header_banner").clientHeight +
					document.querySelector("#header_navigation").clientHeight;
				if (
					headerHeight + cvPage.clientHeight + cvPage.clientHeight >
					window.innerHeight
				) {
					this.fix = true;
				}
				this.previewMenu.width =
					document.querySelector("#cv_page").clientWidth;

				if (
					cvPage.clientHeight -
						(window.scrollY - headerHeight) +
						cvOptions.clientHeight <
						viewport.clientHeight ||
					headerHeight +
						cvPage.clientHeight +
						cvOptions.clientHeight <
						viewport.clientHeight
				) {
					this.fix = false;
					previewTip.setAttribute(
						"style",
						`height: ${cvPage.clientHeight}px !important`
					);
				} else {
					this.fix = true;
					cvPage.style.maxHeight = document.querySelector('#paper').clientHeight+"px !important";
					let x = () =>
						headerHeight - window.scrollY <= 0
							? 0
							: headerHeight - window.scrollY;
					previewTip.setAttribute(
						"style",
						`height: ${
							window.innerHeight - x() - cvOptions.clientHeight
						}px !important`
					);
				}
			}
		});
	},

	destroyed() {
		window.removeEventListener("resize", this.getViewportWidth);
	},

	watch: {
		showWizard(val) {
			this.doShowWizard(val);
		},
		currentFormTabIndex(val) {
			if (val === this.navigation.at(this.navigation.length - 1).id) {
				this.notLastPage = false;
			} else {
				this.notLastPage = true;
			}
		},
	},

	computed: {
		...mapGetters({
			user: "user",
			userExists: "userExists",
			colors: "colors",
			activeColor: "activeColor",
			photoClass: "photoClass",
			clientWidth: "clientWidth",
			canGoForward: "canGoForward",
		}),
		showWizard() {
			return this.userExists ? true : false;
		},
		formTabComponent() {
			return this.currentFormTab;
		},
		pagePosition() {
			return window.scrollY;
		},
	},

	methods: {
		...mapActions({
			createUser: "doCreateUser",
			setUserExists: "doSetUserExists",
			changeActiveColor: "doSetActiveColor",
			setPhotoClass: "doSetPhotoClass",
			setClientWidth: "doSetClientWidth",
			setClickedGoForward: "doSetClickedGoForward",
		}),

		toggleWizard() {
			this.setUserExists(true);
			this.createUser();
		},

		doShowWizard(val) {
			if (!val) {
				document.body.classList.value =
					"d-flex h-100 text-center text-white bg-dark";
			} else {
				document.body.classList.value = "bg-gray";
			}
		},

		doGetViewportWidth() {
			this.getViewportWidth();
			let appPage = document.querySelector('#app_page')
			let footer = document.querySelector('footer')
			let main = document.querySelector('main')
			if (footer.style.position === 'static') {
				if (appPage.clientHeight + 48 + 74 < window.innerHeight) {
					footer.style.position = 'absolute';
					footer.style.width = '100%';
					footer.style.bottom = 0;
				} 
			} else if (footer.style.position === 'absolute') {
				if (appPage.clientHeight + 48 + footer.clientHeight + 74 > window.innerHeight) {
					footer.style.position = 'static';
				}
			}
		},

		getViewportWidth() {

			
			let width = window.innerWidth;
			let widthSize;
			if (width < 576) {
				widthSize = 1;
			} else if (width >= 576 && width < 768) {
				widthSize = 2;
			} else if (width >= 768 && width < 992) {
				widthSize = 3;
			} else if (width >= 992 && width < 1200) {
				widthSize = 4;
			} else if (width >= 1200 && width < 1400) {
				widthSize = 5;
			} else if (width >= 1400) {
				widthSize = 6;
			}
			this.setClientWidth(widthSize);
		},

		changeFormTab(id) {
			let letGo = false;
			this.setClickedGoForward(true);
			if (
				id < this.currentFormTabIndex ||
				(id < this.maxIndex && this.canGoForward)
			) {
				letGo = true;
				this.setClickedGoForward(false);
			} else if (id >= this.maxIndex && this.canGoForward) {
				this.maxIndex++;
				letGo = true;
				this.setClickedGoForward(false);
			}

			if (letGo) {
				this.currentFormTab = this.navigation[id].component;
				this.currentFormTabIndex = this.navigation[id].id;
				setTimeout(() => {
					window.scrollTo(0, 0);
				}, 100);
			}
		},

		buttonClass(id) {
			if (id === this.currentFormTabIndex) {
				return "btn-primary active fw-bold";
			} else if (id > this.maxIndex) {
				return "btn-outline-primary border-primary disabled";
			} else {
				return "btn-outline-primary border-primary bg-light";
			}
		},

		navDotClass(id) {
			if (id > this.currentFormTabIndex) {
				return "bg-darkInfo";
			} else {
				return "bg-info";
			}
		},

		isDone(id) {
			return id < this.currentFormTabIndex ? true : false;
		},

		showPreviewTip() {
			this.shownPreviewTip = true;
			document.querySelector("#cv_page").style.opacity = 0.3;
		},

		hidePreviewTip() {
			this.shownPreviewTip = false;
			document.querySelector("#cv_page").style.opacity = 1;
		},

		setThemeMode() {
			if (this.theme === "dark") {
				document.getElementById("dark_mode").disabled = false;
				this.theme = "light";
				this.themeTitle = "Tryb jasny";
				localStorage.setItem("theme", "dark");
			} else {
				document.getElementById(this.link.id).disabled = true;
				this.theme = "dark";
				this.themeTitle = "Tryb ciemny";
				localStorage.setItem("theme", "light");
			}
		},

		downloadCv() {
                const element = document.querySelector('#cv_page');
                html2pdf().set({
                    margin: 1,
                    filename: 'cv.pdf',
                    image: { type: 'jpeg', quality: 1 },
                    html2canvas: { scale: 2 },
                    jsPDF: {
                        orientation: 'p',
                        unit: 'mm',
                        format: 'a4',
                    }
                }).from(element)
                .save();
            },
	},
};
</script>

<style lang="scss">
html {
	height: 100% !important;
}

html,
body {
	font-family: "Lato", sans-serif;
	scroll-behavior: smooth;
	min-width: 284px;
}

.header-navigation-button {
		transition: all .5s ease;

	&:hover, &:focus {
		background-color: rgb(183, 191, 199) !important;
		border-radius: 10%/50%;
	}
	&:active {
		background-color: rgb(193, 201, 209) !important;
		border-radius: 30%/70%;
		transition: all .15s ease-out;
	}
}

#footer {
	background-color: var(--bs-gray-800);
}

.bg-gray {
	background-color: var(--bs-gray-500);
}

.hidden-links {
	position: absolute;
	top: -100%;
	list-style-type: none;
	margin: 0;

	> li {
		> a:focus {
			background-color: #000 !important;
			text-decoration: none;
			color: #fff;
			padding: 5px;
			position: fixed;
			top: 0;
			left: 0;
			border: 0;
		}
	}
}

.slide-vertical-enter-from {
	opacity: 0;
	transform: translateY(100%);
}

.slide-vertical-enter-to,
.slide-vertical-leave-from {
	opacity: 1;
	transform: translateY(0);
}

.slide-vertical-enter-active,
.slide-vertical-leave-active {
	transition: all 0.3s ease;
}

.slide-vertical-leave-to {
	opacity: 0;
	transform: translateY(-100%);
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	scale: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
	scale: 1;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s ease;
}

.list-inline-item-name {
	color: var(--bs-dark) !important;
	font-weight: 700;
}

.list-inline-item-value {
	color: var(--bs-gray-800) !important;
	font-weight: 400;
}

@media print {

	#app_page {
		display: none !important;
	}

	#cv_download {
		display: block !important;
		height: 100vh !important;
		padding: 1rem;

		.left-panel {
			padding-left: .5rem;
			word-break: normal;
		}

		.rodo {
			margin: 1rem;
		}

	}
}


#preview-tip {
	top: 50%;
	position: relative;
	text-align: center;
	transform: translateY(-50%);
	z-index: 5;
	scroll-behavior: smooth;

	p {
		font-size: 1rem !important;
		font-weight: 700;
	}
}

#cv_page {
	transition: all 0.3s ease;
}

#cv-preview {
	position: fixed;
	right: 5%;
	bottom: calc(74px + 10%);
	color: white;
}

#preview {
	height: 250px;

	.left-panel {
		h2 {
			font-size: 1vw;
			padding-top: 0.5vw !important;
			padding-bottom: 0.5vw !important;
			margin: 0.5vw auto !important;
		}

		ul {
			margin-bottom: 0.5vw !important;
		}
	}

	.col-8 {
		padding-left: 0.8%;

		h2 {
			font-size: 1vw;
		}

		.col-3 {
			padding-right: 0;
			padding-top: 0.2vw;
		}
	}

	.card {
		padding: 3%;
	}

	li,
	h5,
	p {
		font-size: 0.8vw;
		margin: 0.2vw !important;
		padding: 0.2vw !important;
	}
}

#cv_options {
	padding: 1rem;
	h2 {
		text-transform: uppercase;
		margin: 1rem 0;
		font-size: 0.75rem;
	}
	li,
	h5,
	p {
		font-size: 1rem;
	}

	.preview-button-container {
		width: 3.25rem !important;
	}

	.preview-button {
		transition: all 0.3s ease;
		&:hover {
			height: 2.5rem;
			width: 2.5rem;
		}
	}

	.preview-button {
		height: 2rem;
		width: 2rem;
	}

	.preview-button-active {
		height: 2.5rem;
		width: 2.5rem;
		color: white;
	}
}

#modal_preview_footer {
	margin: 0;
	padding: 0.5rem;
	.modal-mobile-preview-button {
		transition: all 0.3s ease;
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-radius: 0;

		&:hover {
			border-bottom-color: #0dcaf0;
		}

		&-active,
		&-active:hover {
			border-bottom-color: #4651bb;
		}
	}
}

.form-section {
	padding-top: 0.75rem;
	&:first-child {
		padding-top: 0.25rem;
	}
}

.form-control {
	border-radius: 0;
	&:focus {
		border-bottom-width: 2px;
	}
}

textarea {
	max-height: 10rem;
}

.nav-dot {
	width: 12px;
	height: 12px;
	padding: 0;
	list-style-type: none;
	border-radius: 50%;
	border: 1px solid transparent;
	margin: auto 0.5rem;
}

.text-small {
	font-size: 0.75rem !important;
}

.required::after {
	content: " *";
	color: red;
}

.cv-fullview {
	width: 900px !important;
}

@media screen and (max-width: 767px) {
	#footer {
		margin-bottom: 74px !important;
	}
}

@media screen and (min-width: 768px) {
	#footer {
		margin-bottom: 0 !important;
	}
}

@media screen and (max-width: 991px) {
	#preview-column {
		max-width: 280px !important;

		#cv_page,
		#cv_options {
			width: 280px !important;
		}

		h2 {
			display: block;
		}
	}
}

@media screen and (min-width: 992px) {
	#preview-column {
		max-width: 380px !important;

		#cv_page,
		#cv_options {
			width: 380px !important;
		}

		h2 {
			display: inline-block;
		}
	}
}
</style>