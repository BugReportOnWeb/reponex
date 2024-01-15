import { GitHubEvent } from "../../../types/github"

type ActivityCardProps = {
    event: GitHubEvent;
}

const ActivityCard = ({ event }: ActivityCardProps) => {
    return (
        <main>
            <div key={event.id} className="flex items-center border rounded-md border-gray-700 gap-2 p-2 text-sm">
                <div className="w-1/6 font-medium text-base">{event.type.split("E")[0]}</div>
                {event.type === "IssuesEvent" && (
                    <a href={event.payload.issue?.html_url} className="w-5/6 flex justify-between text-sm text-[#ededed]/60 hover:text-blue-500">
                        <h1>
                            {event.payload.issue?.title}
                        </h1> <h1 className={event.payload.issue?.state === "open" ? "text-red-500 font-semibold uppercase" : "text-green-500 font-semibold uppercase"}>
                            {event.payload.issue?.state}
                        </h1>
                    </a>
                )}
                {event.type === "PullRequestEvent" && (
                    <a href={event.payload.pull_request?.html_url} className="w-5/6 flex gap-1 justify-between text-sm text-[#ededed]/60 hover:text-blue-500">
                        <h1>
                            {event.payload.pull_request?.title}
                        </h1>
                        <h1 className={event.payload.pull_request?.state === "open" ? "text-red-500 font-semibold uppercase" : "text-green-500 font-semibold uppercase"}>
                            {event.payload.pull_request?.state}
                        </h1>
                    </a>
                )}
                {event.type === "WatchEvent" && (
                    <div className="w-5/6 flex gap-1 text-[#ededed]/60">
                        <h1>{event.actor.login}</h1>
                        <h3 className="font-semibold">{event.payload.action}</h3>
                        <h1>{event.repo.name}</h1>
                    </div>
                )}
                {event.type === "ForkEvent" && (
                    <a href={event.payload.forkee?.html_url} className="w-5/6 flex justify-between text-sm text-[#ededed]/60 hover:text-blue-500">
                        <div className="flex gap-1">
                            <h1>{event.actor.login}</h1>
                            <h3 className="font-semibold">forked</h3>
                            <h1>{event.repo.name}</h1>
                        </div>
                        {/* Added fork icon */}
                    </a>
                )}
                {event.type === "PushEvent" && (
                    <div className="w-5/6 flex gap-1 text-[13px] text-[#ededed]/60">
                        <h1>{event.actor.login} pushed</h1>
                        <h1 className="font-semibold">{event.payload.commits?.length} commits</h1>
                        <h1>to {event.repo.name}</h1>
                    </div>
                )}
                {event.type === "CreateEvent" && (
                    <a href={`https://github.com/${event.repo.name}/tree/${event.payload.master_branch}`} className="w-5/6 text-sm flex gap-1 text-[#ededed]/60 hover:text-blue-500">
                        <h1>Created </h1>
                        <h3 className="font-semibold uppercase">{event.payload.ref_type}</h3>
                        <h1>- {event.repo.name} #{event.payload.master_branch}</h1>
                    </a>
                )}
                {event.type === "DeleteEvent" && (
                    <div className="w-5/6 text-sm flex gap-1 text-[#ededed]/60">
                        <h1>Deleted </h1>
                        <h3 className="font-semibold uppercase">{event.payload.ref_type}</h3>
                        <h1>- {event.repo.name} #{event.payload.ref}</h1>
                    </div>
                )}
            </div>

        </main>
    )
}

export default ActivityCard;
