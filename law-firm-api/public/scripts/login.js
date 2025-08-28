document.addEventListener('DOMContentLoaded', function() {
  
  loginScripts();
  const year = new Date().getFullYear();
  document.getElementById('yearCount').textContent = year;

})

function loginScripts(){ 

  const loginForm = document.querySelector('.login-form');
  
  const inputs = loginForm.querySelectorAll('input, select, textarea'); 

  let username = ''
  let password = ''

  document.getElementById('loginBtn').addEventListener('click', function() {

    inputs.forEach((element) => {
      
      if(element.name === 'username'){ username = element.value}
      if(element.name === 'password'){ password = element.value}

    });
    loginFunction(username, password)
  })

}

async function loginFunction(email, password){

  console.log(`Email ${email} password ${password}`)


  Swal.fire({
    title: "Logging in…",
    text: "Please wait",
    allowOutsideClick: false,
    didOpen: () => {
        Swal.showLoading();
    }
});


try{

    const res = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password}),
      credentials: 'include'
    });

    const result = await res.json();

    if(result.success){
        setTimeout(() => {

            Swal.close(); 
            Swal.fire({
                icon: 'success',
                title: `Success!`,
                text: result.message
            });
            
            console.log(result.user.email)
            console.log(result.user.role)
            console.log(result.user.admin_id)
            /* console.log( req.session.user) */

            return;

        }, 2000)
        
    }else{
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: result.message,
            showConfirmButton: false,
            timer: 5000
        });
    }

  }catch(err){
      Swal.close();
      Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error occurred, please try again or refresh the page.', err,
          showConfirmButton: false,
          timer: 5000
      });
      
  }

}