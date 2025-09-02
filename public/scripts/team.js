
function teamFunction() {

    loadData()

    async function loadData() {
        const result = await getTeam();
        searchTeam()
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
            tableList.innerHTML = `<tr><td colspan="6" class="text-center">Loading...</td></tr>`;
            return;
        }

        let tableHTML = "";

        if(data.length === 0){
            tableList.innerHTML = "<tr><td class='no-data' colspan='6'> No data </td></tr>";
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
                        <button>
                            Update
                        </button>

                        <button>
                            Delete
                        </button>

                    </td>

                </tr>`
                    
            });   

            tableList.innerHTML = tableHTML;
            
        }

    }




}