import {ComponentProps, ElementType} from "react";

type TextOwnProps<E extends ElementType = ElementType> = {
    children: string,
    as?: E
};


type TextAllProps<E extends ElementType> = TextOwnProps<E> & Omit<ComponentProps<E>, keyof TextOwnProps>;

let defaultElement = "div";

export default <E extends ElementType>({children, as, ...otherProps} : TextAllProps<E>) => {
    const TagName = as || defaultElement;
    return (
        <TagName {...otherProps}>{children}</TagName>
    )
}

