export async function showDetails(recipe, id){

   try {
    const res = await fetch(`http://localhost:3030/data/recipes/${id}`);

    if(!res.ok){
        const err = await res.json();
    } 

    const data = await res.json();
    console.log(data);
    
    
} catch (err){
    alert(err.message)
}
     
}

