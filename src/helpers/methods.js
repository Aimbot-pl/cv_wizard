export default {
    checkInput(input, error) {
		if (input.value) {
			error.classList.value = "invalid-feedback d-none"
			input.classList.value = "form-control border-top-0 border-start-0 border-end-0 bg-transparent shadow-none"
		} else {
			error.classList.value = "invalid-feedback d-block"
			input.classList.value = "is-invalid form-control border-top-0 border-start-0 border-end-0 bg-transparent shadow-none"
		}
	}
}