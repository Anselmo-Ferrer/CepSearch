type ResultProps = {
  name: string;
  busca: string;
}


export function Result({name, busca}: ResultProps) {
  return (
    <div className="flex flex-col w-fit gap-3 py-5">
          <span className="bg-stone-900 p-2 rounded-xl w-fit">{name}</span>
          <span className="ml-2">{busca}</span>
    </div>
  )
}