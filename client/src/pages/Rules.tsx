import { getRules } from "../lib/config";

const Rules = () => {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-3">
      <div className="text-white text-2xl font-extrabold font-heading">General Rules</div>
      <section className="w-full h-full flex flex-col items-center pb-20">
        {getRules.map((rule, index) => (
          <div key={index} className="w-[95%] flex flex-col border-[1px] border-cyan-200 hover:border-blue-500 rounded-xl p-2 m-2">
            <div className="flex items-center">
              <span className="text-blue-600 font-extrabold text-lg">{index}</span>
              <span className="text-slate-300 text-[1 rem] font-medium ml-2">{rule.title}</span>
            </div>
            <div className="max-w-full h-full ml-5">
              <span className="text-slate-400 text-sm">{rule.description}</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Rules;
