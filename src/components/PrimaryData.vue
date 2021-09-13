<template>

    <!-- Add image -->
	<div class="row px-3 form-section">
        <h2>Dodaj zdjęcie</h2>
        <div class="col-12 mb-4 d-flex justify-content-center">
            <div 
                v-if="localData.photo" 
                class="position-relative d-inline-block w-50"
            >
                <img 
                    id="photo-placeholder" 
                    :src="localData.photo" 
                    class="img-thumbnail w-100" 
                />
                <button 
                    @click="deleteImage" 
                    class="btn btn-primary rounded-circle fs-4 bi bi-trash" 
                    id="delete_image"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Usuń zdjęcie"
                ></button>
            </div>
            <input 
                v-else 
                @input="addImage"
                type="file" 
                name="photo" 
                id="photo" 
                class="form-control mt-3"
            >
        </div>

        <!-- Crop image modal -->
        <div
            class="modal fade"
            id="cropModal"
            tabindex="-1"
            aria-labelledby="cropModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
        >
            <div
                class="
                    modal-dialog
                    modal-dialog-centered
                    modal-dialog-scrollable
                "
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cropModalLabel">
                            Przytnij obraz
                        </h5>
                        <button
                            type="button"
                            class="btn-close dismiss-cropp"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="localData.photo">
                            <div class="col-8 offset-2">
                                <img 
                                    :src="localData.photo" 
                                    id="photo_crop" 
                                    style="display: block; max-width: 100%;" 
                                />
                            </div>
                            <div class="col-2">
                                <div id="photo_preview"></div>
                            </div>
                        </div>
                    </div>  
                    <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-secondary dismiss-cropp"
                    >Anuluj</button>
                    <button 
                        type="button" 
                        class="btn btn-primary accept-cropp"
                    >Przytnij</button>
                </div>  
                </div>
            </div>
        </div>
    </div>

    <!-- Primary data -->
    <div class="row px-3 form-section">
        <h2>Dane podstawowe</h2>
        <div class="col-12 mb-4">
            <label 
                for="first_name" 
                class="form-label required"
                :class="{'is-invalid': errors.firstName}"
            >Imię</label>
            <input
                type="text"
                name="first_name"
                id="first_name"
                @blur="checkInput('firstName')"
                v-model="localData.firstName"
                :class="[form_text, {'is-invalid': errors.firstName}]"
            />
            <span 
                v-if="errors.firstName"
                class="d-block invalid-feedback"
            >
                {{ errors.firstName }}
            </span>
        </div>

        <div class="col-12 mb-4">
            <label 
                for="last_name" 
                class="form-label required"
                :class="{'is-invalid': errors.lastName}"
            >Nazwisko</label>
            <input
                type="text"
                name="last_name"
                id="last_name"
                @blur="checkInput('lastName')"
                ref="last_name"
                v-model="localData.lastName"
                :class="[form_text, {'is-invalid': errors.lastName}]"
            />
            <span
                v-if="errors.lastName"
                class="invalid-feedback"
            >
                {{ errors.lastName }}
            </span>
        </div>
    </div>

    <!-- Contact data -->
    <div class="col-12 px-3 form-section">
        <h2 class="required">Dane kontaktowe</h2>
        <div class="row mb-4">
            <div class="col-12 col-sm-6 mb-4 mb-sm-0">
                <label 
                    for="contact_form" 
                    class="form-label"
                    :class="{'is-invalid': errors.contactForm}"
                >Forma kontaktu</label
                >
                <select
                    @change="
                        setInputType($refs.contact_form, $refs.contact_value)
                    "
                    @emptied="setInputType($refs.contact_form, $refs.contact_value)"
                    name="contact_form"
                    id="contact_form"
                    ref="contact_form"
                    v-model="formData.contact.contactForm"
                    :class="[form_select, {'is-invalid': errors.contact}]"
                >
                    <option 
                        value="" 
                        selected 
                        hidden
                    ></option>
                    <option value="Numer telefonu">Numer telefonu</option>
                    <option value="Email">Email</option>
                    <option value="GitHub">GitHub</option>
                    <option value="LinkedIn">LinkedIn</option>
                </select>
            </div>
            <div class="col-12 col-sm-6">
                <label 
                    for="contact_value"
                    class="form-label"
                    :class="{'is-invalid': errors.contactValue}"
                >Kontakt</label>
                <input
                    disabled
                    type="text"
                    name="contact_value"
                    id="contact_value"
                    ref="contact_value"
                    @input="errors.contactValue = null"
                    v-model="formData.contact.contactValue"
                    :class="[form_text, {'is-invalid': errors.contactValue}, {'is-invalid': errors.contact}]"
                />
                <span 
                    v-if="errors.contactValue" 
                    class="invalid-feedback d-block"
                >
                    {{ errors.contactValue }}
                </span>
            </div>
            <span 
                v-if="errors.contact" 
                class="invalid-feedback d-block"
            >
                {{ errors.contact }}
            </span>
        </div>
        <button
            @click="addContact()"
            :class="form_add_position"
        >
            Dodaj pozycję
        </button>
        <div 
            v-if="localData.contact" 
            class="my-2"
        >
            <p
                v-for="contact in localData.contact"
                :key="contact.contactForm"
                :class="list_inline"
            >
                <span class="list-inline-item-name">{{ contact.contactForm }}: </span> 
                <span class="list-inline-item-value">{{ contact.contactValue }}</span>
                <button
                    @click="removeItem(contact, localData.contact, 'contact')"
                    :class="list_inline_button"
                    data-bs-toggle="tooltip" 
                    data-bs-placement="right" 
                    title="Usuń pozycję"
                ></button>
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Cropper from "cropperjs";
import classes from '../helpers/classes'
import methods from '../helpers/methods'
export default {
	name: "Primary data",
	data() {
		return {
			localData: {
				photo: null,
				firstName: null,
				lastName: null,
				contact: [],
			},

            requiredFields: [
                'firstName',
                'lastName',
                'contact'
            ],

			formData: {
				photo: null,
				firstName: null,
				lastName: null,
				contact: {
					contactForm: "",
					contactValue: "",
					contactClass: "",
				},
			},

			errors: {
				firstName: null,
				lastName: null,
				contact: null,
				contactValue: null,
			}
		};
	},

	created() {
		this.localData = {
			photo: this.user.photo,
			firstName: this.user.firstName,
			lastName: this.user.lastName,
			contact: this.user.contact,
		};
        this.checkForm();
	},

	watch: {
		firstName(val, oldVal) {
			if (val) {
				this.errors.firstName = null
			} else if (!val && oldVal) {
				this.errors.firstName = 'Uzupełnij, to pole jest wymagane'
			}
            this.checkForm();
			this.updateApp(this.localData);
		},

		lastName(val, oldVal) {
			if (val) {
				this.errors.lastName = null
			} else if (!val && oldVal) {
				this.errors.lastName = 'Uzupełnij, to pole jest wymagane'
			}
            this.checkForm();
			this.updateApp(this.localData);
		},
        
        clicked(val) {
            if (val) {
                this.checkForm();
            }
        }
	},

	computed: {
		...classes,
		...mapGetters({
			user: "user",
            clickedGoForward: "clickedGoForward"
		}),
		firstName() {
			return this.localData.firstName;
		},
		lastName() {
			return this.localData.lastName;
		},
        clicked() {
            return this.clickedGoForward;
        }
	},
	methods: {
		...methods,
		...mapActions({
			updateApp: "doUpdateApp",
            setCanGoForward: "doSetCanGoForward"
		}),

		addContact() {
            if (!this.formData.contact.contactValue) {
                this.errors.contactValue = 'Musisz podać wartość'
            } else {
                let canAdd = true
                this.localData.contact.forEach(item => {
                    if (item.contactForm === this.formData.contact.contactForm) {
                        canAdd = false
                        this.errors.contact = 'Podana pozycja już istnieje'
                    }
                })
                if (canAdd) {
                    this.errors.contact = ''
                    this.localData.contact.push({ ...this.formData.contact });
                    this.updateApp(this.localData);
                    this.formData.contact = {
                        contactForm: "",
                        contactValue: "",
                        contactClass: "",
                    };
                }
                this.checkForm();
            }
        },

        setInputType(select, input) {
            input.disabled = false
            this.errors.contact = null
            this.errors.contactValue = null
            if (select.value === "Numer telefonu") {
                input.type = "tel";
                this.formData.contact.contactClass = "bi-phone"
            } else if (select.value === "Email") {
                input.type = "email";
                this.formData.contact.contactClass = "bi-envelope"
            } else {
                input.type = "text";
                if (select.value === "LinkedIn") {
                    this.formData.contact.contactClass = "bi-linkedin"
                } else if (select.value === "GitHub") {
                    this.formData.contact.contactClass = "bi-github"
                }
            }
        },

        removeItem(item, collection, key) {
            if (this.localData.hasOwnProperty(key)) {
                this.localData[key] = collection.filter((cItem) => item !== cItem).map(arr => arr);
                this.checkForm();
                this.updateApp(this.localData);
            }
        },

        addImage() {
            let file = document.querySelector('#photo').files[0];
            let reader = new FileReader();
            let myModal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById("cropModal")
            );
            reader.onload = (e) => {
                this.localData.photo = e.target.result;
                myModal.show();
            }
            reader.readAsDataURL(file);
            let cropper;
            myModal._element.addEventListener('shown.bs.modal', () => {
                cropper = new Cropper(document.querySelector('#photo_crop'), {
                    aspectRatio: 1,
                    viewMode: 2,
                    preview: document.querySelector('#photo_preview')
                });
                let dismissCropp = document.querySelectorAll('.dismiss-cropp');
                let acceptCropp = document.querySelector('.accept-cropp');
                for (let button of dismissCropp) {
                    button.addEventListener('click', () => {
                        this.localData.photo = null;
                        cropper.destroy();
                        cropper = null;
                        this.updateApp(this.localData);
                        myModal.hide();
                    })
                }

                acceptCropp.addEventListener('click', () => {
                    cropper.getCroppedCanvas({
                        width: 256,
                        height: 256,
                        imageSmoothingQuality: 'high'
                    }).toBlob((blob) => {
                        let url = URL.createObjectURL(blob);
                        let croppReader = new FileReader();
                        croppReader.readAsDataURL(blob);
                        croppReader.onloadend = () => {
                            this.localData.photo = croppReader.result;
                            this.updateApp(this.localData);
                            myModal.hide();
                        }
                    })
                })
            });
        },
        
        deleteImage() {
            this.localData.photo = null;
            this.updateApp(this.localData);
        },

        checkInput(input) {
            if (!this.localData[input].length) {
                this.errors[input] = "Uzupełnij, to pole jest wymagane";
            }
        },

        checkForm() {
            if (this.requiredFields.every((field) => this.localData[field].length)) {
                this.setCanGoForward(true);
            } else {
                if (this.clickedGoForward) {
                    this.requiredFields.forEach((field) => {
                        if (!this.localData[field].length) {
                            this.errors[field] = "Uzupełnij, to pole jest wymagane";
                        }
                    });
                }
                this.setCanGoForward(false);
            }
        }
	},
};
</script>

<style lang="scss" scoped>

button#delete_image {
    position: absolute;
    bottom: -20px;
    right: -20px;
    z-index: 5;
}

</style>