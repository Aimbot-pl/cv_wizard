<template>
    <div class="d-flex justify-content-between">
        <div>
            <h2>Styl zdjęcia</h2>
        </div>
        <div>
            <div class="d-inline-block preview-button-container">
                <button 
                    @click="setPhotoClass('rounded-circle')"
                    :class="[photoClass === 'rounded-circle' ? 'preview-button-active bi bi-check' : 'preview-button']"
                    class="btn btn-primary rounded-circle"
                ></button>
            </div>

            <div class="d-inline-block preview-button-container">
                <button 
                    @click="setPhotoClass('img-thumbnail')"
                    :class="[photoClass === 'img-thumbnail' ? 'preview-button-active bi bi-check' : 'preview-button']"
                    class="btn btn-primary"
                    style="border-radius: 30%;"
                >
                </button>
            </div>

            <div class="d-inline-block preview-button-container">
                <button 
                    @click="setPhotoClass('')"
                    :class="[photoClass === '' ? 'preview-button-active bi bi-check' : 'preview-button']"
                    class="btn btn-primary rounded-0"
                ></button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'MobileSetPhoto',
        computed: {
            ...mapGetters({
                photoClass: "photoClass"
            })
        },
        methods: {
            ...mapActions({
                setPhotoClass: "doSetPhotoClass"
            })
        }
    }
</script>

<style lang="scss" scoped>
    h2 {
        text-transform: uppercase;
        margin: 1rem 0;
        font-size: 0.75rem;
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
</style>