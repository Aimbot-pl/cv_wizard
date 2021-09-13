<template>
	<div class="cv-page bg-white">
		<div class="row" style="--bs-gutter-x: 0;">
			<!-- left sidebar -->
			<div 
				class="col-4 text-light left-panel"
				:style="{'background-color': color}"
			>
				<div class="m-2">
					<img 
						v-if="user.photo" 
						class="avatar" 
						:class="photoClass"
						:src="user.photo" 
					/>
				</div>
				<h2 v-if="user" class="px-2">
					{{ user.firstName }} {{ user.lastName }}
				</h2>
				<ul v-if="user.contact" class="mb-3">
					<li
						v-for="contact in user.contact"
						class="bi"
						:key="contact.contactForm"
						:class="contact.contactClass"
					>
						{{ contact.contactValue }}
					</li>
				</ul>

				<div v-if="user.skills.length">
					<h2>Umiejętności</h2>
					<ul>
						<li v-for="skill in user.skills" :key="skill">
							{{ skill }}
						</li>
					</ul>
				</div>
				<div v-if="user.languages.length">
					<h2>Języki</h2>
					<ul>
						<li
							v-for="language in user.languages"
							:key="language.language"
						>
							{{ language.language }}:
							{{ language.languageLevel }}
						</li>
					</ul>
				</div>
				<div v-if="user.interested.length" class="mb-3">
					<h2>Zainteresowania</h2>
					<ul>
						<li v-for="int in user.interested" :key="int">
							{{ int }}
						</li>
					</ul>
				</div>
			</div>

			<!-- main content -->
			<div class="col-8 pt-0 mt-0 right-panel">
				<div v-if="user.description" class="card bg-light pt-0 mt-0">
					<h2>O mnie</h2>
					<p class="topBorder">
						{{ user.description }}
					</p>
				</div>

				<div v-if="user.education.length" class="card bg-light">
					<h2>Wykształcenie</h2>
					<div
						v-for="edu in user.education"
						:key="edu"
						class="row topBorder"
					>
						<div class="col-12 col-sm-3 d-flex justify-content-center d-sm-block">
							<p class="education-dates">{{ edu.dateStart }}</p>
							<p class="education-dates text-end">
								<span v-if="edu.stillLearning">- obecnie</span>
								<span v-else>- {{ edu.dateEnd }}</span>
							</p>
						</div>
						<div class="col-12 col-sm-9">
							<h5>{{ edu.schoolNname }}</h5>
							<p> <span class="d-block fw-bold my-2 d-sm-inline-block my-sm-0">Specjalizacja:</span> {{ edu.specialization }}</p>
							<p> <span class="d-block fw-bold my-2 d-sm-inline-block my-sm-0">Wykształcenie:</span> {{ edu.educationLevel }}</p>
							<div v-if="edu.certificate.length">
								<h5>Certyfikaty</h5>
								<p
									v-for="cert in edu.certificate"
									:key="cert.name"
								>
									<b>{{ cert.name }}</b
									>: {{ cert.description }}
								</p>
							</div>
							<p v-if="edu.description">{{ edu.description }}</p>
						</div>
					</div>
				</div>

				<div v-if="user.projects.length" class="card bg-light">
					<h2>Projekty</h2>
					<div
						v-for="project in user.projects"
						:key="project.title"
						class="row topBorder projects"
					>
						<div class="col-12">
							<h5>{{ project.projectTitle }}</h5>
							<p>{{ project.projectDescription }}</p>
							<p>
								Link:
								<a
									v-if="project.projectLink"
									target="_blank"
									:href="'https://' + project.projectLink"
									>{{ project.projectLink }}</a
								>
							</p>
						</div>
					</div>
				</div>
				<p class="rodo">
					Wyrażam zgodę na przetwarzanie moich danych osobowych dla
					potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie
					z Rozporządzeniem Parlamentu Europejskiego i Rady (UE)
					2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób
					fizycznych w związku z przetwarzaniem danych osobowych i w
					sprawie swobodnego przepływu takich danych oraz uchylenia
					dyrektywy 95/46/WE (RODO).
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters({
			user: "user",
			color: "activeColor",
			photoClass: "photoClass"
		}),
	},
};
</script>

<style lang="scss" scoped>
.avatar {
	display: block;
	margin: 1rem auto;
	overflow: hidden;
	max-width: 100%;
	transition: all 0.3s ease;
}

#cv {
	margin: auto;
}

@media screen and (max-width: 575px) {
	.left-panel {
		ul {
			> li {
				font-size: 3vw !important;
				text-align: center;
				.bi {
					&::before {
						padding-right: 2vw !important;
					}
				}
			}
		}

		h2 {
			font-size: 3.75vw !important;
		}
	}

	.right-panel {
		h2 {
			font-size: 7vw !important;
		}

		p {
			font-size: 4vw !important;
			
			&.rodo {
				font-size: 0.75rem !important;
				margin: 1rem;
			}
		}

		.education-dates {
			p {
				font-size: 4vw !important;
				display: inline-block !important;
			}
		}

		.education-info {
			h5 {
				font-size: 5vw !important;
				font-weight: 600 !important;
			}
		}

		.projects {
			h5 {
				font-size: 5vw;
			}

			p {
				font-size: 4vw;
			}
		}
	}
}

@media screen and (min-width: 576px) {
	.left-panel li {
		text-align: left;
		margin-left: 1rem;
	}
}

ul {
	padding: 0;

	> li {
		padding: 0.5rem 0;
		list-style: none;
		> .bi {
			display: inline;
		}
	}
}

.left-panel {
	transition: all 0.3s ease;
	h2 {
		text-align: center;
		padding-top: 1rem;
	}

	> h2 {
		margin: 2rem 0.5rem;
		color: white;

		&:first-child {
			margin: 0.5rem;
		}
	}
}

.bi::before {
	padding-right: 1em;
}

.contact-padding {
	padding-left: 0.5rem;
}

.card {
	margin: 1rem 0.5rem;
	padding: 0.75rem;

	&:first-child {
		margin-top: 0.5rem;
	}

	p {
		margin-bottom: 0.3rem;
	}
}

.education-dates {
	margin: 0;
}

.topBorder {
	border-top: 1px solid #dee2e6;
	padding-top: 1rem;
}

</style>