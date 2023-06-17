// ---------------Employee Data Array------------------
let userData = [
    // {id:1,name:"jack",profession:"developer",age:20},
    // {id:2,name:"john",profession:"admin",age:28}
];

const name = document.getElementById('name');
const profession = document.getElementById('profession');
const age = document.getElementById('age');
const addUserBtn = document.querySelector('.add-user');
const error = document.querySelector('.error');
const success = document.querySelector('.success');
const clear = document.querySelector('.emp-status');
let displayInput = document.querySelector('.display-input');
let ido = 1;

// ------------Validation of Input Data--------------
function errorCheck(){
    let agevalue = parseInt((age.value).trim());

    if((name.value).trim() === '' || (profession.value).trim() === '' || (age.value).trim() === '' || (agevalue < 1 || agevalue > 99)){
        console.log('Error');
        error.style.display = 'block';
        success.style.display = 'none';
    } else {
        console.log('Success');
        error.style.display = "none";
        success.style.display = 'block';

        enterData();
    }
}

//----------Passing Input Data to Employee Data Array--------------
function enterData(){
    let data = {
        'id': ido++,
        'name': name.value.trim(),
        'profession': profession.value.trim(),
        'age': parseInt(age.value)
    };

    userData.push(data);
    console.log(userData);
    name.value = '';
    profession.value = '';
    age.value = '';

    displayUserData(userData);
}

//-----------Displaying Employee Data to UI----------
function displayUserData(){
  
    displayInput.innerHTML = '';

    userData.forEach(user => {
        let nameValue = user.name.trim();
        let professionValue = user.profession.trim();   

        displayInput.innerHTML +=  `
            <div class="display-container" id=${user.id}>
                <ul class="input-info">
                    <li>${user.id}.</li>
                    <li>Name: ${nameValue[0].toUpperCase() + nameValue.slice(1, nameValue.length)}</li>
                    <li>Profession: ${professionValue[0].toUpperCase() + professionValue.slice(1, professionValue.length)}</li>
                    <li>Age: ${user.age}</li>
                </ul>
                <button type="submit" class="delete-user">Delete User</button>
            </div>
        `;
        clear.style.display = 'none';


 // -----------Deleting Selected data from Employee data---------------------
 
        let deleteUser = document.querySelectorAll('.delete-user');
    
        for(let i = 0; i < deleteUser.length; i++){
            deleteUser[i].addEventListener('click', (e) => {
                // e.preventDefault();
                let div = deleteUser[i].parentElement;
                let id = div.getAttribute('id');
                userData = userData.filter(ele => ele.id !== parseInt(id));
                console.log('Deleted ID--> ' + parseInt(id));
                console.log(userData);
                div.remove();
                success.style.display = 'none';
                error.style.display = "none";

                if(userData.length === 0){
                    isDisplayEmty();
                }
            });
        }

    });
}

function isDisplayEmty(){
    clear.style.display = 'block';
    ido = 1;
}

//----------Invoke the Process on Click---------------
addUserBtn.addEventListener('click', errorCheck);

