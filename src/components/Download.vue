<template>
    <div class="row px-3 form-section">
        <div class="text-center">
            <img 
                src="images/file_success.png" 
                :class="[clientWidth < 3 ? 'w-25' : 'w-50']"
            />
            <h1>Twoje CV jest gotowe!</h1>
            <p>Teraz pobierz je jako PDF i aplikuj.</p>
            <p><b>Pamiętaj</b>, więcej wysłanych CV to większa szansa na znalezienie wymarzonej pracy</p>
            <p>Trzymamy kciuki!</p>
        </div>
        <div class="col-12 text-center">
            <button @click="downloadCv" class="btn btn-primary bi bi-download px-5 py-2 rounded-pill">
                Pobierz CV
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: 'Download',
        emits: ['download-cv'],
        computed: {
            ...mapGetters({
                clientWidth: "clientWidth"
            })
        },
        methods: {
            downloadCv() {
            const element = document.querySelector('#cv-download');
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
        }
    }
</script>
