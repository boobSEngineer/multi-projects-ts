import {ComponentProps, ElementType} from "react";


type ButtonOwnProps<E extends ElementType = ElementType> = {
    children: string,
    as?: E
}

type ButtonAllProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>

const defaultElement = "button";

export default <E extends ElementType>({children, as, ...otherProps} : ButtonAllProps<E>) => {
    const TagName = as || defaultElement;
    return (
        <TagName {...otherProps}>{children}</TagName>
    )
}
