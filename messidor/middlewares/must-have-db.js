// login-client.js
export default async function ({
    store,
    redirect,
    route
}) {
    if (!window.myDB) {
        return redirect({
            name: 'index'
        });
    }
}
