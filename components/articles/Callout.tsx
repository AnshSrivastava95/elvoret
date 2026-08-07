type Props = {
    variant: "info" | "warning" | "success";
    title: string;
    text: string;
};

export default function Callout({
    variant,
    title,
    text,
}: Props) {

    const styles = {
        info: {
            bg: "bg-blue-50",
            border: "border-blue-500",
            title: "text-blue-700",
            icon: "💡",
        },

        warning: {
            bg: "bg-yellow-50",
            border: "border-yellow-500",
            title: "text-yellow-700",
            icon: "⚠️",
        },

        success: {
            bg: "bg-green-50",
            border: "border-green-500",
            title: "text-green-700",
            icon: "✅",
        },
    };

    const style = styles[variant];

    return (
        <div
            className={`my-10 rounded-2xl border-l-4 ${style.border} ${style.bg} p-6`}
        >
            <div className="flex items-start gap-4">

                <div className="text-2xl">
                    {style.icon}
                </div>

                <div>

                    <h4 className={`text-lg font-bold ${style.title}`}>
                        {title}
                    </h4>

                    <p className="mt-2 leading-8 text-gray-700">
                        {text}
                    </p>

                </div>

            </div>
        </div>
    );
}