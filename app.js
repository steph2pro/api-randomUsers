//recuperation du mot saisie et de la zone d'affichage
const searchInput=document.querySelector("#search");
var searchResult=document.querySelector(".table-results")
console.log(searchResult)
//declaration de la fonction qui va recuperer des donne a l'api
let dataArray;
//async parce qu'on veut faire de l'asyncrone
//donc on veut utiliser await
async function getUsers(){
	//parametrage de l'url pour avoir 50persone de nationaliter francise
	let url="https://randomuser.me/api/?nat=fr&results=50"
	//on attent les resulta de la fonction fetch qui va les chercher a l'api

	const res=await fetch(url)
	//on fait du destructuring sur la reponse pour avoir rapidement acces au donne sous forme de tableau
	const {results}=await res.json()
	//on stock le tableau en le triant avec une fonction
	dataArray=orderList(results)
	//apel de la fonction de creation des utilisateur
	createUserList(dataArray);
}
getUsers()
//fonction de trie 
function orderList(data){
	//on trie le tableau avec la fonction sort
	const orderedData=data.sort((a,b)=>{
		if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
			return -1;
		}
		if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
			return 1;
		}
		return 0;
	});
	return orderedData;

}
//fonction d'ajout d'utilisateur
function createUserList(usersList){
	//on parcour le tableau en creant chaque element
	usersList.forEach(user=>{
		const listItem=document.createElement("div");
		listItem.setAttribute("class","table-item");
		listItem.innerHTML=`
			<div class="container-img">
				<img src="${user.picture.medium}">
				<p class="name">${user.name.last} ${user.name.first}</p>
			</div>
			<p class="email">${user.email}</p>
			<p class="phone">${user.phone}</p>
		`;
		//on ajout table-item a la table-results
		
		searchResult.appendChild(listItem);
	});	
}
 searchInput.addEventListener("input",filterListener);

 function filterListener(e){
 	searchResult.innerHTML="";
 	const searchedString=e.target.value.toLowerCase().replace(/\s/g,"");
 	const filteredArr=dataArray.filter(el=>
 		el.name.last.toLowerCase().includes(searchedString) ||
 		el.name.first.toLowerCase().includes(searchedString) ||
 		`${el.name.last + el.name.first}`.toLowerCase().replace(/\s/g,"").includes(searchedString)||
 		`${el.name.first + el.name.last}`.toLowerCase().replace(/\s/g,"").includes(searchedString)
 		)
 	createUserList(filteredArr)
 }