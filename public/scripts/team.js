
function teamFunction() {

    loadData()

    async function loadData() {
        const result = await getTeam();
        searchTeam()
        addBtn();
    }


    function searchTeam(){
        const input = document.getElementById("search_team");

        input.addEventListener("input", function () {
            
            teamTable(); //For loading

            clearTimeout(input.delayTimer); 
            input.delayTimer = setTimeout(async () => {
                let searchValue = this.value;

                getTeam(searchValue);
                
            }, 1500);
        });
    }

    async function getTeam(search){

        try{

            const url = search ? `http://localhost:3000/api/team?search=${search}` : `http://localhost:3000/api/team`;

            const res = await fetch(url, {
                method: "GET",
                credentials: "include"
            })
            const result = await res.json()
            teamTable(result)
            return result

        }catch(err){
            console.log(err)
        }

    }

    function teamTable(data){

        const tableList = document.querySelector('.show-teamList');
    
        if (!data) {
            tableList.innerHTML = `<tr><td colspan="7" class="text-center">Loading...</td></tr>`;
            return;
        }

        let tableHTML = "";

        if(data.length === 0){
            tableList.innerHTML = "<tr><td class='no-data' colspan='7'> No data </td></tr>";
        }
        else{
            data.forEach((admin) => {

                 sp = admin.specialization;
                
                if(sp === null){
                    sp = "---"
                }

                tableHTML += `<tr>
                    <td>${admin.first_name} ${admin.last_name}</td>
                    <td>${admin.email_address}</td>
                    <td>${admin.contact_number}</td>
                    <td>${admin.date_created}</td>
                    <td>${admin.role}</td>
                    <td>${sp}</td>
                    <td>

                        <button class='delete_btn' data-id="${admin.admin_id}">
                            Delete
                        </button>

                    </td>

                </tr>`
                    
            });   

            tableList.innerHTML = tableHTML;
            actionTable()
        }

    }

    function actionTable(){

        const tableBody = document.querySelector('.show-teamList')

        tableBody.addEventListener('click', function(e) {

            const target = e.target;

            if(target.classList.contains('delete_btn')){
                const row = target.closest('.delete_btn');
                const id = row.dataset.id;
                console.log(`Delete team ${id}`)
            }


        })

    }

    function addBtn() {

        document.getElementById('add_team').addEventListener('click', function() {

            const modalEl = document.getElementById('viewModal'); // actual DOM element
            const modalBody = document.getElementById('viewModalContent');
            const modalLabel = document.getElementById('viewModalLabel');
            const modalFooter = document.querySelector('.modal-footer');

            // Reset modal
            modalLabel.textContent = 'Add Member';
            modalBody.innerHTML = '';

            // Create form
            const form = document.createElement('form');
            form.id = "addForm";

            // First input
            const label1 = document.createElement('label')
            label1.textContent = 'First Name';
            label1.setAttribute('for', 'first_name')
            label1.className = "form-label mt-2";

            const input1 = document.createElement('input');
            input1.type = "text";
            input1.className = "form-control mb-3";
            input1.name = "field1";
            input1.id = "first_name";

            // Second input
            const label2 = document.createElement('label')
            label2.textContent = 'Last Name';
            label2.setAttribute('for', 'last_name');
            label2.className = "form-label mt-2";

            const input2 = document.createElement('input');
            input2.type = "text";
            input2.className = "form-control mb-3";
            input2.name = "field2";
            input2.id = "last_name";

            // Third input gmail
            const label3 = document.createElement('label')
            label3.textContent = 'Email';
            label3.setAttribute('for', 'email_address')
            label3.className = "form-label mt-2";

            const input3 = document.createElement('input')
            input3.type = "email";
            input3.className = "form-control mb-3";
            input3.name = "field3"
            input3.id = "email_address"


            // Select element for role
            const selectLabel = document.createElement('label');
            selectLabel.textContent = "Choose a role:";
            selectLabel.className = "form-label mt-2";
            selectLabel.setAttribute('for', 'select_role_id')

            const selectRole = document.createElement('select');
            selectRole.className = "form-select";
            selectRole.name = "Role";
            selectRole.id = "select_role_id";

            ["lawyer", "staff"].forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.toLowerCase().replace(" ", "_");
                option.textContent = opt;
                selectRole.appendChild(option);
            });

            //Select Specialization if new member role is lawyer
            const selectSpecLabel = document.createElement('label')
            selectSpecLabel.textContent = "Lawyer's Specialization";
            selectSpecLabel.className = "form-label mt-2";

            const selectSpec = document.createElement('select')
            selectSpec.className = "form-select mb-3";
            selectSpec.name = "Specialization";
            selectSpec.id = "select_spec_id";

            ['Criminal Law','Civil Law','Family Law','Corporate Law',
                'Labor Law','Tax Law','Intellectual Property Law',
                'Environmental Law','Immigration Law','Constitutional Law',
                'Bankruptcy Law'].forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.toLowerCase().replace(" ", "_");
                option.textContent = opt;
                selectSpec.appendChild(option);
            });

            // Input password
            const pass1Label = document.createElement('label');
            pass1Label.textContent = 'Enter Password';
            pass1Label.setAttribute('for', 'enter_password');
            pass1Label.className = "form-label mt-2";

            const pass1 = document.createElement('input');
            pass1.type = "password";
            pass1.className = "form-control mb-3";
            pass1.name = "Enter Password";
            pass1.id = "enter_password";

            // Re enter password
            const pass2Label = document.createElement('label');
            pass2Label.textContent = 'Re-enter Password';
            pass2Label.setAttribute('for', 'reEnter_password');
            pass2Label.className = "form-label mt-2";

            const pass2 = document.createElement('input');
            pass2.type = "password";
            pass2.className = "form-control mb-3";
            pass2.name = "Re-enter Password";
            pass2.id = "reEnter_password";

            // Add button
            const saveBtn = document.createElement('button');   
            saveBtn.type = "button";                      
            saveBtn.className = "btn btn-primary";        
            saveBtn.textContent = "Save";
            saveBtn.id = "save_btn_id";

            // Append everything
            form.appendChild(label1);
            form.appendChild(input1);

            form.appendChild(label2);
            form.appendChild(input2);

            form.appendChild(label3);
            form.appendChild(input3);

            form.appendChild(selectLabel);
            form.appendChild(selectRole);

            form.appendChild(selectSpecLabel);
            form.appendChild(selectSpec);

            selectRole.addEventListener('change', function () {
                 if(this.value === "staff"){
                    if (form.contains(selectSpecLabel)) form.removeChild(selectSpecLabel);
                    if (form.contains(selectSpec)) form.removeChild(selectSpec);
                }else{
                    form.appendChild(selectSpecLabel);
                    form.appendChild(selectSpec);
                }
            });

            form.appendChild(pass1Label);
            form.appendChild(pass1);

            form.appendChild(pass2Label);
            form.appendChild(pass2);

            modalBody.appendChild(form);
            modalFooter.appendChild(saveBtn);

            // Show modal with Bootstrap instance
            const modal = new bootstrap.Modal(modalEl);
            modal.show();

            // Reset when modal is hidden
            modalEl.addEventListener("hidden.bs.modal", () => {
                modalBody.innerHTML = "";   
                if (saveBtn) saveBtn.remove();
            });

        })

    }


    





}