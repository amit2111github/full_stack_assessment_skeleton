const api = 'http://localhost:5000';
export const getAllUser = async () => {
  try {
    const response = await fetch(`${api}/user/find-all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllHomeForUser = async (user, page) => {
  try {
    if (!user) return { data: [] };
    const response = await fetch(
      `${api}/home/find-by-user/${user}?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserForHome = async (home) => {
  try {
    const response = await fetch(`${api}/user/find-by-home/${home.id}`);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserForHome = async (intrestedUser, home) => {
  const userIds = intrestedUser
    .filter((user) => user.intrested)
    .map((user) => user.id);
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ homeId: home.id, userIds }),
  };
  const response = await fetch(`${api}/home/update-users`, requestOptions);
  const data = await response.json();
  return data;
};
