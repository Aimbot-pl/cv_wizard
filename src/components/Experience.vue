<template>
	<div class="row px-3 form-section">

		<!-- Education section -->
		<h2 class="mb-3 required">Wykształcenie</h2>
		<div class="col-12 mb-4">

		<!-- Education list preview -->
			<div v-if="localData.education">
				<div v-for="edu in localData.education" :key="edu.id">
					<div
						class="card p-2 bg-gray text-small mb-3"
					>
						<div class="d-flex justify-content-end">
							<button
								@click="editField(edu, formData.education)"
								class="
									btn-outline-secondary btn
									rounded-circle
									border-0
									bi bi-pencil
								"
								data-bs-toggle="tooltip"
								data-bs-placement="right"
								title="Edytuj pozycję"
							></button>
							<button
								@click="
									removeItem(
										edu,
										localData.education,
										'education'
									)
								"
								class="
									btn-outline-secondary btn
									rounded-circle
									border-0
									bi bi-trash
								"
								data-bs-toggle="tooltip"
								data-bs-placement="right"
								title="Usuń pozycję"
							></button>
						</div>
						<p v-if="edu.dateStart" class="m-0 list-inline-item-name">
							Okres: <span class="list-inline-item-value">{{ edu.dateStart }} -</span>
							<span v-if="edu.dateEnd" class="list-inline-item-value">
								{{ edu.dateEnd }}
							</span>
							<span v-else class="list-inline-item-value">obecnie </span>
						</p>
						<p v-if="edu.schoolName" class="m-0 list-inline-item-name">
							Nazwa szkoły: <span class="list-inline-item-value">{{ edu.schoolName }} </span>
						</p>
						<p v-if="edu.specialization" class="m-0 list-inline-item-name">
							Specjalizacja: <span class="list-inline-item-value">{{ edu.specialization }} </span>
						</p>
						<p v-if="edu.educationLevel" class="m-0 list-inline-item-name">
							Poziom: <span class="list-inline-item-value">{{ edu.educationLevel }} </span>
						</p>
					</div>
				</div>
			</div>

			<!-- Button which trigger education modal -->
			<button
				type="button"
				:class="form_add_position"
				data-bs-toggle="modal"
				data-bs-target="#educationModal"
				autofocus
			>
				Dodaj pozycję
			</button>

			<!-- Education errors -->
			<span 
				v-if="errors.education"
				class="invalid-feedback d-block"
			>
				{{ errors.education }}
			</span>

			<!-- Education modal -->
			<div
				class="modal fade"
				id="educationModal"
				tabindex="-1"
				aria-labelledby="educationModalLabel"
				aria-hidden="true"
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
							<h5 class="modal-title" id="educationModalLabel">
								Wykształcenie - nowa pozycja
							</h5>
							<button
								@click="flushFormEducationData()"
								type="button"
								class="btn-close"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
							<div class="row">

								<!-- Education level -->
								<div class="col-12 mb-4">
									<label
										for="education_level"
										class="form-label required"
										>Poziom wykształcenia</label
									>
									<select
										@change="
											errors.educationForm.educationLevel =
												null
										"
										name="education_level"
										id="education_level"
										autofocus
										v-model="
											formData.education.educationLevel
										"
										:class="[
											form_select,
											{
												'is-invalid':
													errors.educationForm
														.educationLevel,
											},
										]"
									>
										<option
											value=""
											selected
											hidden
										></option>
										<option value="podstawowe">
											podstawowe
										</option>
										<option value="zawodowe">
											zawodowe
										</option>
										<option value="średnie">średnie</option>
										<option value="licencjat">
											licencjat
										</option>
										<option value="inżynier">
											inżynier
										</option>
										<option value="magister">
											magister
										</option>
										<option value="magister inżynier">
											magister inżynier
										</option>
										<option value="lekarz medycyny">
											lekarz medycyny
										</option>
										<option value="studia podyplomowe">
											studia podyplomowe
										</option>
										<option value="MBA">MBA</option>
										<option value="doktorat">
											doktorat
										</option>
										<option value="doktor hab.">
											doktor hab.
										</option>
										<option value="profesor">
											profesor
										</option>
									</select>
									<span
										v-if="
											errors.educationForm.educationLevel
										"
										class="invalid-feedback mb-1 mt-1"
										:class="{
											'd-block':
												errors.educationForm
													.educationLevel,
										}"
									>
										{{
											errors.educationForm.educationLevel
										}}
									</span>
								</div>

								<!-- School name -->
								<div class="col-12 mb-4">
									<label
										for="school_name"
										class="form-label required"
										>Nazwa szkoły</label
									>
									<input
										@input="
											errors.educationForm.schoolName =
												null
										"
										type="text"
										name="school_name"
										id="school_name"
										v-model="formData.education.schoolName"
										:class="[
											form_text,
											{
												'is-invalid':
													errors.educationForm
														.schoolName,
											},
										]"
									/>
									<span
										v-if="errors.educationForm.schoolName"
										class="invalid-feedback my-1"
										:class="{
											'd-block':
												errors.educationForm
													.schoolName,
										}"
									>
										{{ errors.educationForm.schoolName }}
									</span>
								</div>

								<!-- Specialization -->
								<div class="col-12 mb-4">
									<label
										for="specialization"
										class="form-label"
										>Specjalizacja</label
									>
									<input
										type="text"
										name="specialization"
										id="specialization"
										v-model="
											formData.education.specialization
										"
										:class="form_text"
									/>
								</div>

								<!-- Certificates -->
								<div class="col-12 mb-4">
									<label class="form-label"
										>Certyfikaty</label
									>
									<div class="mb-3">
										<div class="mb-3">
											<label
												for="certificate_name"
												class="form-label text-small"
												>Nazwa</label
											>
											<input
												@input="
													errors.educationForm.certificate.name =
														null
												"
												type="text"
												id="certificate_name"
												name="certificate_name"
												v-model="certificate.name"
												:class="[
													form_text,
													{
														'is-invalid':
															errors
																.educationForm
																.certificate
																.name,
													},
												]"
											/>
											<span
												v-if="
													errors.educationForm
														.certificate.name
												"
												class="
													d-block
													invalid-feedback
													my-1
												"
											>
												{{
													errors.educationForm
														.certificate.name
												}}
											</span>
										</div>
										<div class="mb-3">
											<label
												for="certificate_description"
												class="form-label text-small"
												>Opis</label
											>
											<textarea
												@input="
													errors.educationForm.certificate.description =
														null
												"
												id="certificate_description"
												name="certificate_description"
												v-model="
													certificate.description
												"
												:class="{
													'is-invalid':
														errors.educationForm
															.certificate
															.description,
												}"
												class="form-control shadow-none"
											></textarea>
											<span
												v-if="
													errors.educationForm
														.certificate.description
												"
												class="
													d-block
													invalid-feedback
													my-1
												"
											>
												{{
													errors.educationForm
														.certificate.description
												}}
											</span>
										</div>
										<div
											class="
												d-flex
												justify-content-center
											"
										>
											<button
												@click="addCertificate"
												class="
													btn btn-primary
													rounded-pill
													bi bi-plus
												"
											>
												Dodaj pozycję
											</button>
										</div>
									</div>
									<div v-if="formData.education.certificate">
										<p
											v-for="cert in formData.education
												.certificate"
											:key="cert.name"
											:class="list_inline"
										>
											<span>
												{{ cert.name }}
											</span>
											<button
												@click="removeCertificate(cert)"
												:class="list_inline_button"
												data-bs-toggle="tooltip"
												data-bs-placement="right"
												title="Usuń pozycję"
											></button>
										</p>
									</div>
								</div>

								<!-- Date start -->
								<div class="col-12 mb-4">
									<label
										for="date_start"
										class="form-label required"
										>Data rozpoczęcia</label
									>
									<div>
										<button
											@click="
												picker.dateStart =
													!picker.dateStart
											"
											class="
												btn
												position-absolute
												text-secondary
												shadow-none
												bi bi-calendar4-event
											"
										></button>
										<input
											type="text"
											name="date_start"
											id="date_start"
											@input="
												addDate(
													month_start,
													year_start,
													'dateStart'
												)
											"
											v-model="
												formData.education.dateStart
											"
											class="ps-5"
											:class="[
												form_text,
												{
													'is-invalid':
														errors.educationForm
															.dateStart,
												},
											]"
										/>
									</div>
									<div
										class="
											position-static
											bg-light
											border
											row
											p-3
											m-3
											date-picker
										"
										id="picker_start"
										v-if="picker.dateStart"
									>
										<div class="col-6 mb-4">
											<label
												for="month_start"
												:class="form_label"
												>Miesiąc</label
											>
											<select
												id="month_start"
												ref="month_start"
												name="month_start"
												:class="form_select"
											>
												<option
													v-for="month in months"
													:key="month.id"
													:selected="
														date.getMonth() + 1 ===
														month.id
													"
													:value="month.id"
												>
													{{ month.name }}
												</option>
											</select>
										</div>

										<div class="col-6">
											<label
												for="year_start"
												:class="form_label"
												>Rok</label
											>
											<select
												id="year_start"
												ref="year_start"
												name="year_start"
												:class="form_select"
											>
												<option
													v-for="year in years"
													:key="year"
													:selected="
														date.getFullYear() ===
														year
													"
													:value="year"
												>
													{{ year }}
												</option>
											</select>
										</div>
										<div class="col-12 text-center">
											<button
												@click="
													addDate(
														$refs.month_start.value,
														$refs.year_start.value,
														'dateStart'
													)
												"
												class="
													btn btn-success
													px-3
													py-2
													rounded-pill
												"
											>
												Zapisz
											</button>
										</div>
									</div>
									<span
										class="d-block invalid-feedback"
										v-if="errors.educationForm.dateStart"
									>
										{{ errors.educationForm.dateStart }}
									</span>
								</div>

								<!-- Date end -->
								<div class="col-12 mb-4">
									<label for="date_end" class="form-label"
										>Data zakończenia</label
									>
									<div>
										<button
											@click="
												picker.dateEnd = !picker.dateEnd
											"
											:disabled="
												formData.education
													.stillLearning
											"
											class="
												btn
												position-absolute
												text-secondary
												shadow-none
												bi bi-calendar4-event
											"
										></button>
										<input
											@input="
												addDate(
													month_end,
													year_end,
													'dateEnd'
												)
											"
											type="text"
											name="date_end"
											id="date_end"
											v-model="formData.education.dateEnd"
											:disabled="
												formData.education
													.stillLearning
											"
											class="ps-5"
											:class="[
												form_text,
												{
													'is-invalid':
														errors.educationForm
															.checkDateEnd,
												},
											]"
										/>
										<span
											v-if="
												errors.educationForm
													.checkDateEnd
											"
											class="invalid-feedback my-1"
											:class="{
												'd-block':
													errors.educationForm
														.checkDateEnd,
											}"
										>
											{{
												errors.educationForm
													.checkDateEnd
											}}
										</span>
									</div>
									<div
										class="
											position-static
											bg-light
											border
											row
											p-3
											m-3
											date-picker
										"
										id="picker_end"
										v-if="picker.dateEnd"
									>
										<div class="col-6 mb-4">
											<label
												for="month_end"
												:class="form_label"
												>Miesiąc</label
											>
											<select
												id="month_end"
												ref="month_end"
												name="month_end"
												:class="form_select"
											>
												<option
													v-for="month in months"
													:key="month.id"
													:selected="
														date.getMonth() + 1 ===
														month.id
													"
													:value="month.id"
												>
													{{ month.name }}
												</option>
											</select>
										</div>

										<div class="col-6">
											<label
												for="year_end"
												:class="form_label"
												>Rok</label
											>
											<select
												id="year_end"
												ref="year_end"
												name="year_end"
												:class="form_select"
											>
												<option
													v-for="year in years"
													:key="year"
													:selected="
														date.getFullYear() ===
														year
													"
													:value="year"
												>
													{{ year }}
												</option>
											</select>
										</div>
										<div class="col-12 text-center">
											<button
												@click="
													addDate(
														$refs.month_end.value,
														$refs.year_end.value,
														'dateEnd'
													)
												"
												class="
													btn btn-success
													px-3
													py-2
													rounded-pill
												"
											>
												Zapisz
											</button>
										</div>
									</div>

									<span
										class="d-block invalid-feedback"
										v-if="errors.educationForm.dateEnd"
									>
										{{ errors.educationForm.dateEnd }}
									</span>
								</div>

								<!-- Still learning checkbox -->
								<div class="col-12 mb-2">
									<div class="form-check">
										<input
											@change="changeStillLearning"
											type="checkbox"
											name="still_learning"
											id="still_learning"
											v-model="
												formData.education
													.stillLearning
											"
											class="form-check-input"
											:class="{
												'is-invalid':
													errors.educationForm
														.checkDateEnd,
											}"
										/>
										<label
											for="still_learning"
											class="form-check-label"
											>nadal się uczę</label
										>
										<span
											v-if="
												errors.educationForm
													.checkDateEnd
											"
											class="invalid-feedback my-1"
											:class="{
												'd-block':
													errors.educationForm
														.checkDateEnd,
											}"
										>
											{{
												errors.educationForm
													.checkDateEnd
											}}
										</span>
									</div>
								</div>
								<div class="col-12 mb-4">
									<label for="description" class="form-label"
										>Opis</label
									>
									<textarea
										name="description"
										id="description"
										class="form-control"
										v-model="formData.education.description"
									></textarea>
								</div>
							</div>
						</div>
						<div class="modal-footer justify-content-evenly">
							<button
								@click="flushFormEducationData()"
								type="button"
								class="btn text-primary shadow-none"
							>
								Anuluj
							</button>
							<button
								@click="addEducation()"
								type="button"
								class="btn btn-primary rounded-pill px-5 py-2"
							>
								Zapisz
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row px-3 form-section">
		<div class="col-12 mb-4">
			<h2 class="required">Znajomość języków</h2>
			<div class="row mb-4">
				<div class="col-12 col-sm-6 mb-4 mb-sm-0">
					<label for="language" class="form-label">Język:</label>
					<select
						name="language"
						id="language"
						@change="errors.languages = null"
						v-model="formData.languages.language"
						:class="[
							form_select,
							{ 'is-invalid': ifInvalidLanguage },
						]"
					>
						<option value="" selected hidden></option>
						<option value="Polski">Polski</option>
						<option value="Angielski">Angielski</option>
						<option value="Niemiecki">Niemiecki</option>
					</select>
					<span
						v-if="errors.language.language"
						class="invalid-feedback d-block"
					>
						{{ errors.language.language }}
					</span>
				</div>

				<div class="col-12 col-sm-6">
					<label for="language_level" class="form-label"
						>Poziom:</label
					>
					<select
						name="language_level"
						id="language_level"
						v-model="formData.languages.languageLevel"
						:class="[
							form_select,
							{ 'is-invalid': errors.language.languageLevel },
						]"
					>
						<option value="" selected hidden></option>
						<option value="A1">A1</option>
						<option value="A2">A2</option>
						<option value="B1">B1</option>
						<option value="B2">B2</option>
						<option value="C1">C1</option>
						<option value="C2">C2</option>
						<option value="ojczysty">ojczysty</option>
					</select>
					<span
						v-if="errors.language.languageLevel"
						class="invalid-feedback d-block"
					>
						{{ errors.language.languageLevel }}
					</span>
				</div>
				<span v-if="errors.languages" class="invalid-feedback d-block">
					{{ errors.languages }}
				</span>
			</div>
			<button @click="addLanguage()" :class="form_add_position">
				Dodaj pozycję
			</button>
		</div>
		<div v-if="localData.languages" class="my-2">
			<p
				v-for="lang in localData.languages"
				:key="lang.language"
				:class="list_inline"
			>
				<span class="list-inline-item-name">{{ lang.language }}: </span>
				<span class="list-inline-item-value">{{ lang.languageLevel }}</span>
				<button
					@click="removeItem(lang, localData.languages, 'languages')"
					:class="list_inline_button"
					data-bs-toggle="tooltip"
					data-bs-placement="right"
				></button>
			</p>
		</div>
	</div>
	<div class="row px-3 form-section">
		<h2>Profil zawodowy</h2>
		<div class="row">
			<div class="col-12 mb-4">
				<label for="description" class="form-label">Opis</label>
				<textarea
					name="description"
					id="description"
					v-model="localData.description"
					class="form-control shadow-none"
				></textarea>
			</div>
		</div>
	</div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import classes from "../helpers/classes";

export default {
	name: "Experience",
	data() {
		return {
			localData: {
				education: [],
				languages: [],
				description: null,
			},

			requiredFields: [
				'education',
				'languages'
			],

			formData: {
				education: {
					educationLevel: null,
					schoolName: null,
					specialization: null,
					dateStart: null,
					dateEnd: null,
					stillLearning: false,
					description: null,
					certificate: [],
				},
				languages: {
					language: null,
					languageLevel: null,
				},
			},

			errors: {
				education: null,
				educationForm: {
					educationLevel: null,
					schoolName: null,
					dateStart: null,
					checkDateEnd: null,
					certificate: {
						name: null,
						description: null,
					},
				},
				languages: null,
				language: {
					language: null,
					languageLevel: null,
				},
				description: null,
			},

			picker: {
				dateStart: false,
				dateEnd: false,
			},

			editingItem: null,
			certificate: {
				name: null,
				description: null,
			},

			months: [
				{ id: 1, name: "STY" },
				{ id: 2, name: "LUT" },
				{ id: 3, name: "MAR" },
				{ id: 4, name: "KWI" },
				{ id: 5, name: "MAJ" },
				{ id: 6, name: "CZE" },
				{ id: 7, name: "LIP" },
				{ id: 8, name: "SIE" },
				{ id: 9, name: "WRZ" },
				{ id: 10, name: "PAŹ" },
				{ id: 11, name: "LIS" },
				{ id: 12, name: "GRU" },
			],

			date: null,
		};
	},

	created() {
		this.localData = {
			education: this.user.education,
			languages: this.user.languages,
			description: this.user.description,
		};
		this.date = new Date();
		this.checkForm();
	},

	mounted() {
		let educationModal = document.querySelector('#educationModal');
		educationModal.addEventListener('shown.bs.modal', () => {
			let inputs = document.getElementsByTagName('select');
			inputs[0].focus();
		});
	},

	destroyed() {
		let educationModal = document.querySelector('#educationModal');
		educationModal.removeEventListener('shown.bs.modal');

	},

	watch: {
		description(val) {
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
		description() {
			return this.localData.description;
		},
		years() {
			let years = [];
			for (let year = 1900; year < 2100; year++) {
				years.push(year);
			}
			return years;
		},
		month_start() {
			return this.formData.education.dateStart
				? parseInt(this.formData.education.dateStart.split("/")[0])
				: null;
		},
		year_start() {
			return this.formData.education.dateStart
				? parseInt(this.formData.education.dateStart.split("/")[1])
				: null;
		},
		month_end() {
			return this.formData.education.dateEnd
				? parseInt(this.formData.education.dateEnd.split("/")[0])
				: null;
		},
		year_end() {
			return this.formData.education.dateEnd
				? parseInt(this.formData.education.dateEnd.split("/")[1])
				: null;
		},
		ifInvalidLanguage() {
			return this.errors.languages || this.errors.language.language
				? true
				: false;
		},
		clicked() {
			return this.clickedGoForward
		}
	},

	methods: {
		...mapActions({
			updateApp: "doUpdateApp",
			setCanGoForward: "doSetCanGoForward"
		}),

		flushFormEducationData() {
			this.formData.education = {
				educationLevel: null,
				schoolName: null,
				specialization: null,
				dateStart: null,
				dateEnd: null,
				stillLearning: false,
				description: null,
				certificate: [],
			};
			let myModal = bootstrap.Modal.getInstance(
				document.querySelector("#educationModal")
			);
			myModal.hide();
		},

		addEducation() {
			let canAdd = true;
			const requiredFields = [
				"educationLevel",
				"schoolName",
				"dateStart",
			];

			const checkDateEnd = ["dateEnd", "stillLearning"];

			requiredFields.forEach((requiredItem) => {
				if (
					this.formData.education.hasOwnProperty(requiredItem) &&
					!this.formData.education[requiredItem]
				) {
					canAdd = false;
					this.errors.educationForm[requiredItem] =
						"Wypełnij to pole";
				}
			});

			if (
				checkDateEnd.reduce(
					(sum, field) => sum + !!this.formData.education[field],
					0
				) === 0
			) {
				canAdd = false;
				this.errors.educationForm.checkDateEnd =
					"Wypełnij jedno z tych pól";
			}

			if (canAdd) {
				if (this.editingItem) {
					this.localData.education.filter((lItem) => {
						if (lItem === this.editingItem) {
							lItem = this.formData.education;
							this.editingItem = null;
						}
					});
				} else {
					this.localData.education.push({
						...this.formData.education,
					});
				}
				this.errors.education = null;
				this.updateApp(this.localData);
				this.flushFormEducationData();
			}
			this.checkForm();
		},

		addCertificate() {
			const requiredFields = ["name", "description"];

			let canAdd = true;

			requiredFields.forEach((requiredField) => {
				if (
					this.certificate.hasOwnProperty(requiredField) &&
					!this.certificate[requiredField]
				) {
					canAdd = false;
					this.errors.educationForm.certificate[requiredField] =
						"Wypełnij to pole";
				}
			});
			if (canAdd) {
				if (
					this.formData.education.certificate.find(
						(item) => item.name === this.certificate.name
					) === undefined
				) {
					this.formData.education.certificate.push(this.certificate);
					this.certificate = {
						name: null,
						description: null,
					};
					this.updateApp(this.localData);
				}
			}
		},

		addDate(month, year, field) {
			this.picker[field] = false;
			if (month > 0 && year >= 1900) {
				this.errors.educationForm[field] = null;
				if (
					this.errors.educationForm.hasOwnProperty(field) &&
					this.formData.education.hasOwnProperty(field)
				) {
					this.formData.education[field] = `${month}/${year}`;
					if (field === "dateStart") {
						if (
							year > this.date.getFullYear() ||
							(year === this.date.getFullYear() &&
								month > this.date.getMonth() + 1)
						) {
							this.errors.educationForm[field] =
								"Data rozpoczęcia nie może być z przyszłości";
						} else {
							this.errors.educationForm[field] = null;
						}
					} else if (field === "dateEnd") {
						if (
							year > this.date.getFullYear() ||
							(year === this.date.getFullYear() &&
								month > this.date.getMonth() + 1)
						) {
							this.errors.educationForm[field] =
								'Data zakończenia nie może być z przyszłości. Zaznacz opcję "nadal się uczę".';
						} else if (
							year < this.year_start ||
							(year === this.year_start &&
								month < this.month_start)
						) {
							this.errors.educationForm[field] =
								"Data zakończenia nie może być wcześniejsza od daty rozpoczęcia";
						} else {
							this.errors.educationForm[field] = null;
						}
					}
				}
			} else {
				this.errors.educationForm[field] = "Podaj poprawną datę";
			}
		},

		changeStillLearning() {
			if (this.formData.education.stillLearning) {
				this.errors.educationForm.checkDateEnd = null;
				this.formData.education.dateEnd = null;
			}
		},

		addLanguage() {
			this.errors.language = {
				language: null,
				languageLevel: null,
			};
			if (!this.formData.languages.language) {
				this.errors.language.language = "Wybierz język";
			} else if (!this.formData.languages.languageLevel) {
				this.errors.language.languageLevel = "Wybierz poziom";
			} else {
				let canAdd = true;
				this.localData.languages.forEach((item) => {
					if (item.language === this.formData.languages.language) {
						canAdd = false;
					}
				});
				if (canAdd) {
					this.errors.languages = null;
					this.localData.languages.push({
						...this.formData.languages,
					});
					this.updateApp(this.localData);
					this.formData.languages = {
						language: null,
						languageLevel: null,
					};
				} else {
					this.errors.languages = "Podana pozycja już istnieje";
				}
			}
			this.checkForm();
		},

		editField(item, collection) {
			var myModal = new bootstrap.Modal(
				document.getElementById("educationModal")
			);
			this.editingItem = item;
			this.formData.education = item;

			myModal.show();
		},

		removeCertificate(item) {
			this.formData.education.certificate =
				this.formData.education.certificate
					.filter((cItem) => item !== cItem)
					.map((arr) => arr);
			this.updateApp(this.localData);
		},

		removeItem(item, collection, key) {
			if (this.localData.hasOwnProperty(key)) {
				this.localData[key] = collection
					.filter((cItem) => item !== cItem)
					.map((arr) => arr);
				this.updateApp(this.localData);
			}
			this.checkForm();
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
