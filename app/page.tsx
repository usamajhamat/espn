import Image from "next/image"


type Props = {
  image: string,
  name: string,
  score: string,
  win: boolean,
  date: string
  
}

const formattedDate = new Date(data).toLocaleString('en-US', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  year: '2-digit'
});
console.log(formattedDate);


const Row = ({image, name, score, win}: Props) => {
  return (
    <div className="flex border-b border-gray-200 justify-between px-4 py-2">
      <div className="flex">
      <Image
      src={image}
      alt=""
      height={20}
      width={20}
    />
    <p className="font-semibold ml-4">{name}</p>
      </div>
      <div className="flex">
        <p className="text-gray-700 text-right">{score}</p>
        {score? (
          win ?  (
            <p className="font-semibold text-green-700">W</p>
          ) : (
              <p className="font-semibold text-red-700">L</p>
          ) 
        ) : (
          <p className="text-gray-700 proportional-nums">{formattedDate}</p>
        )}
        {}
      
      </div>
      
    </div> 
  )
}



const Page = async () => {
  const res = await fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/66/schedule')
  const data = await res.json()
  
  const events = data.events.map(
    (event:{competitions:{competitors: any[]}[]})=>{
    const competitors = events.competitions[0].competitors.map(
      (competitor)=>{
        return{
          id: competitor.team.id,
          name: competitor.team.displayName,
          logo: competitor.team.logos[0].href,
          score: competitor.score,
          winner: competitor.winner
        }
    })
    const favoriteTeam = competitors.find((competitor) => competitor.id === "66")
    const otherTeam = competitors.find((competitor) => competitor.id !== "66")
    return{
      date: event.competitions[0].date,
      name: otherTeam.name,
      logo: otherTeam.logo,
      score:favoriteTeam.score && `${otherTeam.score.displayValue}-${favoriteTeam.score.displayValue}`,
      winner: favoriteTeam.winner
    }
  }) 

  return (
    <>
    <h2 className="font-semibold">Schedule</h2>
    <div>
      {events
      .slice(0, 5)
      .map(
        (event:{
        logo: string,
        name: string, 
        score: string,
        winner: boolean,
        date: string
      }) => {
      return(
        <Row
          key={event.name}
          image={event.logo}
          name={event.name}
          win={event.winner}
          score={event.score}
          date={event.date}
          
        />
      )
      
    })}
    
    </div>
    </>
  )
  
}

export default Page
