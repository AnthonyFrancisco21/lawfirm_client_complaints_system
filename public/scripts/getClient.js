
async function getClientFunction(){

    
    let currentPage = 1;
    let pageSize = 15;
    let searchValue = '';
    getClient(1, '')//For first page
    const input = document.getElementById("search_client").value ='';
    search();

    document.querySelector("a[data-page='prev']").parentElement.classList.toggle("disabled");

    document.getElementById("client-page").addEventListener("click", async (e) => {
        e.preventDefault();
        
        const target = e.target.closest("a[data-page]");
        if (!target) return; // clicked somewhere else

        const action = target.dataset.page;

        if (action === "prev" && currentPage > 1) {
        currentPage--;
        } else if (action === "next") {
        currentPage++;
        }

        const response = await getClient(currentPage, searchValue);

        if (response) {
            
            const totalPages = response.totalPages;

            // disable buttons
            document.querySelector("a[data-page='prev']").parentElement.classList.toggle("disabled", currentPage === 1);
            document.querySelector("a[data-page='next']").parentElement.classList.toggle("disabled", currentPage >= totalPages);
        };

        

    });

    
    function search() {
        const input = document.getElementById("search_client");

        input.addEventListener("input", function () {
            
            table(); 

            clearTimeout(input.delayTimer); 
            input.delayTimer = setTimeout(async () => {
                searchValue = this.value;
                currentPage = 1; 
                console.log("Searching:", searchValue);

                const response = await getClient(currentPage, searchValue);
                console.log(response)

                if (response) {
                    const totalPages = response.totalPages;
                    // update pagination buttons
                    document.querySelector("a[data-page='prev']").parentElement.classList.toggle("disabled", currentPage === 1);
                    document.querySelector("a[data-page='next']").parentElement.classList.toggle("disabled", currentPage >= totalPages);
                }
            }, 1500);
        });
    }
    


    async function getClient(page, searchValue){
        
        try{
            const res = await fetch(`http://localhost:3000/api/getClient?page=${page}&pageSize=${pageSize}&name=${searchValue}`)
            
            const dataResponse = await res.json()
            
            if(!res.ok){
                throw(`Error fetching data:`, res.message)
            }

            table(dataResponse.data)
            return dataResponse;


        }catch(err){
            console.log(err)
        }

    }

    function table(data) {
         const table = document.querySelector('.show-client');

        if (!data) {
            table.innerHTML = `<tr><td colspan="7" class="text-center">Loading...</td></tr>`;
            return;
        }

        let tableHTML = "";

        if(data.length === 0){
            table.innerHTML = "<tr><td class='no-data' colspan='7'> No data </td></tr>";
        }
        else{
            data.forEach((client) => {
                tableHTML += `<tr>
                    <td>${client.first_name} ${client.last_name}</td>
                    <td>${client.age}</td>
                    <td>${client.gender}</td>
                    <td>${client.email_address}</td>
                    <td>${client.contact_number}</td>
                    <td>${client.case_status}</td>
                    <td>${client.date_added}</td>
                </tr>`
                    
            });

            table.innerHTML = tableHTML;
        
        }
    }




}