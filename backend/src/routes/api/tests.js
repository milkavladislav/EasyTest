const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const Test = require("../../models/Test");
const User = require("../../models/User");

// Validation
const validateTestInput = require("../../validation/test");

// @route   GET api/tests/test
// @desc    Tests test route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Tests Works" }));

// @route   GET api/tests
// @desc    Get tests
// @access  Public
router.get("/", (req, res) => {
  Test.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ noPostsFound: "No tests found" }));
});

// @route   GET api/tests/results
// @desc    Get tests
// @access  Public
router.get(
  "/results",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then((user) => {
        res.json(user.passedTests);
      })
      .catch((err) => res.status(404).json({ noTestFound: "No test found" }));
  }
);

// @route   GET api/tests/:id
// @desc    Get test by id
// @access  Public
router.get("/:id", (req, res) => {
  Test.findById(req.params.id)
    .then((test) => res.json(test))
    .catch((err) =>
      res.status(404).json({ noTestFound: "No test found with that ID" })
    );
});

// @route   POST api/tests
// @desc    Create test
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTestInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTest = new Test({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      questions: req.body.questions,
    });

    newTest
      .save()
      .then((test) => {
        User.findById(req.user.id).then((user) => {
          user.tests.push({
            test: test.id,
            name: test.name,
            description: test.description,
          });

          user
            .save()
            .then(() => res.json({ success: true }))
            .catch((err) =>
              res
                .status(404)
                .json({ noTestFound: "No test found with that ID" })
            );
        });
      })
      .catch((err) => console.log(err));
  }
);

// @route   PATCH api/tests
// @desc    Done test
// @access  Private
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then((user) => {
      user.passedTests.push({
        test: req.body.id,
        evolution: req.body.evolution,
        name: req.body.name,
      });

      user
        .save()
        .then((result) => {
          Test.findById(req.body.id).then((test) => {
            test.passedTest.push({
              user: result.name,
              evolution: req.body.evolution,
            });
            test
              .save()
              .then(() => res.json({ success: true }))
          });
        })

        .catch((err) =>
          res.status(404).json({ noTestFound: "No test found with that ID" })
        );
    });
  }
);

// @route   DELETE api/tests/:id
// @desc    Delete test
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Test.findById(req.params.id)
      .then((test) => {
        test.remove().then(() => res.json({ success: true }));
      })
      .catch((err) =>
        res.status(404).json({ noTestFound: "No test found with that ID" })
      );
  }
);

module.exports = router;
