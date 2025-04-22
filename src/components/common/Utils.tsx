import React from 'react';

type OutSideLinkProps = {
    href: string;
    label?: string;
};

export const OutSideLink: React.FC<OutSideLinkProps> = ({ href, label }) => {
    const displayText = label || href;

    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {displayText}
        </a>
    );
};
