async function addEvent(req, callback) {
    var db = req.app.get('db');
    var event = req.body.event

    const app = await db.App.findOne({
        where: {
            owner_id: req.user_id,
        }
    });

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 6000)
    })

    let result = await promise;
}

console.log(addEvent);
