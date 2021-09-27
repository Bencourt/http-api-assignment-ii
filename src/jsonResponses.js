// Note this object is purely in memory
const users = {};

const respondJSON = (request, response, status, object) => {
    const headers =
    {
        'Content-type': 'application/json'
    }

    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    const headers =
    {
        'Content-type': 'application/json'
    }

    response.writeHead(status, headers);
    response.end();
};

const getUsers = (request, response) => {
    const responseJSON = {
        users
    }
    return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
    return respondJSONMeta(request, response, 200);
};

const addUser = (request, response, body) =>
{
    const responseJSON = {
        message: 'Name and Age are both required'
    };

    if(!body.name || !body.age)
    {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 201;

    if(users[body.name])
    {
        responseCode = 204;
    }
    else
    {
        users[body.name] = {};
    }

    users[body.name].name = body.name;
    users[body.name].age = body.age;

    if(responseCode === 201)
    {
        responseJSON.message = "Created successfully";

        return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
};


const updateUser = (request, response) => {
    const newUser = {
        createdAt: Date.now()
    };

    users[newUser.createdAt] = newUser;

    return respondJSON(request, response, 201, newUser);
};

const notFound = (request, response) => {
    const responseJSON = {
        message: "The page you were looking for was not found.",
        id: "notFound"
    }

    return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
    return respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  updateUser,
  notFound,
  notFoundMeta,
};