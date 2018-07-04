<template>
    <div class="page-error">
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'error',
    computed: {
        message() {
            return this.$route.params.error || 'Oops! Something is not quite right o(╥﹏╥)o 就是404';
        }
    },
    created() {
        let query = this.$route.query;
        debugger;
        if (Object.keys(query).length !== 0) {
            this.$router.replace({
                name: 'error',
                params: query
            });
        }
    }
};
</script>
