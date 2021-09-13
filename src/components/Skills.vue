<template>
	<div class="row px-3 form-section">
        <h2>Umiejętności</h2>
        <div class="col-12 mb-4">
            <label for="skills" class="form-label"
                >Wpisz swoje umiejętności</label
            >
            <input
                type="text"
                @keyup.enter="addSkill"
                autofocus
                @input="errors.skills = null"
                v-model="formData.skill"
                :class="[form_text, { 'is-invalid': errors.skills }]"
            />
            <span v-if="errors.skills" class="invalid-feedback d-block">
                {{ errors.skills }}
            </span>
        </div>
        <div class="col-12">
            <button @click="addSkill" :class="form_add_position">
                Dodaj pozycję
            </button>
            <div v-if="localData.skills" class="my-2">
                <p
                    v-for="skill in localData.skills"
                    :key="skill"
                    :class="list_inline"
                >
                    {{ skill }}
                    <button
                        @click="removeItem(skill, localData.skills, 'skills')"
                        :class="list_inline_button"
                        data-bs-toggle="tooltip" 
                        data-bs-placement="right" 
                        title="Usuń pozycję"
                    ></button>
                </p>
            </div>
        </div>
    </div>
    <div class="row px-3 form-section">
        <h2>Zainteresowania</h2>
        <div class="col-12">
            <div class="row mb-4">
                <label for="skills" class="form-label"
                    >Wpisz swoje zainteresowania</label
                >
                <input
                    type="text"
                    @input="errors.interested = null"
                    @keyup.enter="addInterested"
                    v-model="formData.interested"
                    :class="[form_text, { 'is-invalid': errors.interested }]"
                />
                <span v-if="errors.interested" class="invalid-feedback d-block">
                    {{ errors.interested }}
                </span>
            </div>
            <button @click="addInterested" :class="form_add_position">
                Dodaj pozycję
            </button>
            <div v-if="localData.interested" class="my-2">
                <p
                    v-for="int in localData.interested"
                    :key="int"
                    :class="list_inline"
                >
                    {{ int }}
                    <button
                        @click="
                            removeItem(int, localData.interested, 'interested')
                        "
                        :class="list_inline_button"
                        data-bs-toggle="tooltip" 
                        data-bs-placement="right" 
                        title="Usuń pozycję"
                    ></button>
                </p>
            </div>
        </div>
    </div>

    <div class="row px-3 form-section">
        <h2>Projekty</h2>
        <div class="row mb-4">
            <div class="col-12 col-sm-6 mb-4 mb-sm-0">
                <label for="project_title" class="form-label">Tytuł</label>
                <input
                    type="text"
                    name="profect_title"
                    id="project_title"
                    v-model="formData.project.projectTitle"
                    :class="[form_text, {'is-invalid': errors.projects}]"
                />
            </div>
            <div class="col-12 col-sm-6">
                <label for="project_link" class="form-label"
                    >Link (opcjonalnie)</label
                >
                <input
                    type="text"
                    name="profect_title"
                    id="project_link"
                    v-model="formData.project.projectLink"
                    :class="form_text"
                />
            </div>
            <span 
                v-if="errors.projects" 
                class="invalid-feedback d-block"
            >
                {{ errors.projects }}
            </span>
        </div>
        <div class="col-12 mb-4">
            <label for="project_description" class="form-label">Opis</label>
            <textarea
                name="project_description"
                id="project_description"
                @input="errors.projectsDescription = null"
                v-model="formData.project.projectDescription"
                :class="['form-control', {'is-invalid': errors.projectsDescription}]"
            ></textarea>
            <span v-if="errors.projectsDescription" class="invalid-feedback d-block">
                {{ errors.projectsDescription }}
            </span>
        </div>
        <div class="col-12 mb-4">
            <button @click="addProject" :class="form_add_position">
                Dodaj pozycję
            </button>
            <div v-if="localData.projects" class="my-2">
                <p
                    v-for="project in localData.projects"
                    :key="project.projectTitle"
                    :class="list_inline"
                >
                    {{ project.projectTitle }}
                    <button
                        @click="
                            removeItem(project, localData.projects, 'projects')
                        "
                        :class="list_inline_button"
                        data-bs-toggle="tooltip" 
                        data-bs-placement="right" 
                        title="Usuń pozycję"
                    ></button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import classes from "../helpers/classes";
export default {
	name: "Skills",
	data() {
		return {
			localData: {
				interested: [],
				skills: [],
				projects: [],
			},
			formData: {
				skill: null,
				project: {
					projectTitle: null,
					projectDescription: null,
					projectLink: null,
				},
				interested: null,
			},
			errors: {
				skills: null,
				interested: null,
				projects: null,
				projectsDescription: null,
			},
		};
	},
	created() {
		this.localData = {
			interested: this.user.interested,
			skills: this.user.skills,
			projects: this.user.projects,
		};
	},
	watch: {
		projects() {
			this.errors.projects = null;
		},
	},
	computed: {
		...classes,
		...mapGetters(["user"]),
		projects() {
			return this.formData.project.projectTitle;
		},
	},
	methods: {
		...mapActions({
			updateApp: "doUpdateApp",
		}),
		addSkill() {
			if (!this.formData.skill) {
				this.errors.skills = "Pole nie może być puste";
			} else {
				if (
					this.localData.skills.find(
						(el) => el === this.formData.skill
					) === undefined
				) {
					this.errors.skills = null;
					this.localData.skills.push(this.formData.skill);
					this.formData.skill = null;
					this.updateApp(this.localData);
				} else {
					this.errors.skills = "Podana pozycja już istnieje";
				}
			}
		},
		addInterested() {
			if (!this.formData.interested) {
				this.errors.interested = "Pole nie może być puste"
			} else {
				if (
					this.localData.interested.find(
						(el) => el === this.formData.interested
					) === undefined
				) {
					this.errors.interested = null;
					this.localData.interested.push(this.formData.interested);
					this.formData.interested = null;
					this.updateApp(this.localData);
				} else {
					this.errors.interested = "Podana pozycja już istnieje";
				}
			}
		},
		addProject() {
			if (!this.formData.project.projectTitle) {
				this.errors.projects = "Pole nie może być puste"
			} else if (!this.formData.project.projectDescription) {
				this.errors.projectsDescription = "Pole nie może być puste"
			} else {
				if (
					this.localData.projects.find(
						(el) =>
							el.projectTitle === this.formData.project.projectTitle
					) === undefined
				) {
					this.errors.projects = null;
					this.localData.projects.push(this.formData.project);
					this.formData.project = {
						projectTitle: null,
						projectDescription: null,
						projectLink: null,
					};
					this.updateApp(this.localData);
				} else {
					this.errors.projects = "Podana pozycja już istnieje";
				}
			}
		},
		removeItem(item, collection, key) {
			if (this.localData.hasOwnProperty(key)) {
				this.localData[key] = collection
					.filter((cItem) => item !== cItem)
					.map((arr) => arr);
				this.updateApp(this.localData);
			}
		},
	},
};
</script>