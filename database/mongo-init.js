db.createUser({
    user: "ruppert",
    pwd: "mypassword",
    roles: [
      {
        role: "readWrite",
        db: "openscience"
      }
]});
