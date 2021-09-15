<template>
    <div class="d-flex justify-content-between">
        <h2>Wybierz kolor</h2>
        <div>
            <div 
                v-for="c in colors"
                :key="c.color"
                class="d-inline-block preview-button-container"
            >
                <button 
                    @click="changeActiveColor(c.color)"
                    class="btn rounded-circle preview-button"
                    :class="[activeColor === c.color ? 'preview-button-color-active bi bi-check' : 'preview-button-color']"
                    :style="{'background-color': c.color}"
                    :aria-label="c.label"
                >
                    
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'MobileSetColor',
        mounted() {
            console.log(this.colors);
        },
        computed: {
            ...mapGetters({
                colors: "colors",
                activeColor: "activeColor"
            })
        },
        methods: {
            ...mapActions({
                changeActiveColor: "doSetActiveColor"
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

    .preview-button-color {
        height: 2rem;
        width: 2rem;
    }

    .preview-button-color-active {
        height: 2.5rem;
        width: 2.5rem;
        color: white;
    }
</style>