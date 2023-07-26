const express = require('express');
const router = express.Router();
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');

router.post('/join', (req, res) => {
	const temp = req.body;
	console.log(temp, 'temp');

	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			temp.userNum = doc.userNum;
			// temp에는 프론트로부터 받은 displayName, uid값 들어갈 것.
			// 추가로 서버에서 userNum값

			const userDate = new User(temp);
			userData.save().then(() => {
				Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } })
					.exec()
					.then(() => {
						res.json({ success: true }); //프론트로 넘겨줌
					})
					.catch((err) => res.json({ success: false, err: err }));
			});
		});
});

module.exports = router;
