import { ReactNode } from "react"

type ActionTabType = 'repository' | 'issue' | 'pullRequest'

type ActionTabProps = {
    children: ReactNode;
    tab: ActionTabType;
    currentTab: ActionTabType;
    onClick: () => void;
}

const ActionTab = ({ children, tab, currentTab, onClick }: ActionTabProps) => {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-2 transition-colors ease-in-out hover:text-[#ededed]/80 
                ${tab === currentTab ? 'text-[#e1e7ef]/80 underline underline-offset-8 decoration-[#e1e7ef]' : 'text-[#ededed]/60 no-underline'} 
            `}
        >{children}</button>
    )
}

export default ActionTab;
