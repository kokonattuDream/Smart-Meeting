app.factory('registerService', function($http, $location, userInfo){
    return{
        signup: function(user){
            $http({
                method: "POST",
                url: "/signup",
                data: {
                    'email': user.email,
                    'username': user.username,
                    'password': user.password,
                    'employer': user.employer,
                    'department': user.department,
                    'team': user.team,
                }
            }).then(function(response) {
                userInfo.setEmployer(user.employer);
                var res = JSON.parse(JSON.stringify(response.data)).result;
                console.log(res);
                if (res == "pass") {
                    userInfo.setUser(user.username);
                    userInfo.setEmployer(user.employer);
                    userInfo.setDepartment(user.department);
                    userInfo.setEmail(user.email);
                    userInfo.setTeam(user.team);

                    $location.path('/selectRoom');
                    console.log("signup success");
                } else {
                    console.log("signup failed");
                }
            }, function (err) {
                console.log(err);
            });
        },

        signin: function(user){
            $http({
                method: "POST",
                url: "/signin",
                data: {
                    'email': user.email,
                    'password': user.password,
                }
            }).then(function(response) {
                var res = JSON.parse(JSON.stringify(response.data)).result;
                if (res != "fail") {
                    userInfo.setUser(res._usr_name);
                    userInfo.setEmployer(res.usr_employer);
                    userInfo.setDepartment(res.usr_dept);
                    userInfo.setEmail(res.usr_email);
                    userInfo.setTeam(res.usr_team);

                    $location.path('/selectRoom');
                    console.log("signin sucess");
                } else {
                    console.log("signin failed");
                }
            }, function(err) {
                console.log(err);
            });
        }
    }
});
