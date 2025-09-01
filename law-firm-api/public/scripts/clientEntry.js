function clienEntryFunction() {

    loadSript();

    async function loadSript(){
        const lawyers = await getLawyers();
        newClient(lawyers);

    }


    function newClient(lawyers) {

        const selectLawyer = document.getElementById('preferred_lawyer');

        let selectFormRenderer = null;

        if(!lawyers){
            selectLawyer.innerHTML = `<option value=''>-- Failed to render lawyer's details, please restart the page.</option>`;
        }
        if(lawyers === 0){
            selectLawyer.innerHTML = `<option value=''>-- No lawyers from the database.</option>`
        }else{
            lawyers.forEach((lawyer) => {
                selectFormRenderer+= `
                <option value='${lawyer.admin_id}'>Atty. ${lawyer.first_name} ${lawyer.last_name}</option>
                `
            })
        }

        selectLawyer.innerHTML += selectFormRenderer;

        const form = document.getElementById("clientForm");
        const steps = document.querySelectorAll(".form-step");
        const nextBtn = document.getElementById("nextBtn");
        const prevBtn = document.getElementById("prevBtn");
        const saveBtn = document.getElementById("submit-btn");
        let currentStep = 0;

        // Show the first step
        steps[currentStep].classList.add("step-active");

        nextBtn.addEventListener("click", () => {
            // Validate current step first
            const inputs = steps[currentStep].querySelectorAll("input, select, textarea");
            let valid = true;

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity(); // show browser error message
                    valid = false;
                }
            });

            if (!valid) return; // stop if any input is invalid

            // Move to next step
            steps[currentStep].classList.remove("step-active");
            currentStep++;
            steps[currentStep].classList.add("step-active");
        });

        function goPrevStep() {
            steps[currentStep].classList.remove("step-active");
            currentStep--;
            steps[currentStep].classList.add("step-active");
        }

        prevBtn.addEventListener("click", goPrevStep);

        saveBtn.addEventListener("click", (e) => {
            

            // Optional: Final validation before submit
            const inputs = steps[currentStep].querySelectorAll("input, select, textarea");
            let valid = true;
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    valid = false;
                }
            });
            if (!valid) return;

            const formData = new FormData(form);
            
            processClientData(formData)

        });
    }


    async function processClientData(formData){
        
        Swal.fire({
            title: "Adding...",
            text: "Please wait",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });


        try{

            const res = await fetch("http://localhost:3000/api/newClientandCase", {
            method: "POST",
            body: formData,
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
                    const form = document.getElementById("clientForm");
                    form.reset();

                    const prevBtn = document.getElementById("prevBtn");
                    prevBtn.click();

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
                text: 'Error occurred, please try again or refresh the page.',
                showConfirmButton: false,
                timer: 5000
            });
            
        }    
    }

    async function getLawyers(){

        try{                
            const res = await fetch('http://localhost:3000/api/lawyers');
            const result = await res.json();     
            return result

        }catch(err){
            console.log(err)
        }

    }

}
