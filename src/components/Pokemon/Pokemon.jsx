function Pokemon({name , image}){
    return (
        <div>
           <div>{name}</div>
           <img src={image}/>
        </div>
    )
}
export default Pokemon;