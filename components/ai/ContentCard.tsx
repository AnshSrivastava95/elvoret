interface ContentCardProps{
title: string;
description: string;
category: string;
level: "Beginner" | "Intermediate" | "Advanced";
duration: string;
image: string;
progress?: number;
}

export default function ContentCard({
    title,
    description,
    category,
    level,
    duration,
    image,
    progress = 0,
}: ContentCardProps) {
    return(
        <article>
            <img
            src={image}
            alt={title}
            />
            <div>
                <span>{category}</span>
                <span>{level}</span>

            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            <span>{duration}</span>
            <span>{progress}%</span>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-purple-600"
                style={{ width: `${progress}%` }}
                >
                </div>
            </div>

            <button>
                {progress > 0 ? "Continue Learning" : "Start Learning"}
            </button>
        </article>
    )
}