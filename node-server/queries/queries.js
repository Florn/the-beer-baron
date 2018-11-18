const getUserById = `query getUserById($_id: String){
  user (_id: $_id) {
		_id,
    firstName,
    lastName
  }
}`;
