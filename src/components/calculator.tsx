"use client";
import { Button } from "@/components/fluentui/button";
import React, { useState, useEffect } from "react";

const Calculator: React.FC = () => {
    const [displayValue, setDisplayValue] = useState<string>("0");
    const [operator, setOperator] = useState<string | null>(null);
    const [firstValue, setFirstValue] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplayValue(digit);
            setWaitingForOperand(false);
        } else {
            setDisplayValue(
                displayValue === "0" ? digit : displayValue + digit,
            );
        }
    };

    const inputDot = () => {
        if (!displayValue.includes(".")) {
            setDisplayValue(displayValue + ".");
        }
    };

    const handleOperator = (nextOperator: string) => {
        const inputValue = parseFloat(displayValue);
        if (firstValue === null) {
            setFirstValue(displayValue);
        } else if (operator) {
            const result = performCalculation(
                parseFloat(firstValue),
                inputValue,
                operator,
            );
            setDisplayValue(String(result));
            setFirstValue(String(result));
        }
        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const performCalculation = (
        first: number,
        second: number,
        operator: string,
    ) => {
        switch (operator) {
            case "+":
                return first + second;
            case "-":
                return first - second;
            case "*":
                return first * second;
            case "/":
                return second !== 0 ? first / second : "Error";
            case "%":
                return first % second;
            default:
                return second;
        }
    };

    const clearAll = () => {
        setDisplayValue("0");
        setFirstValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const clearLastChar = () => {
        setDisplayValue(
            displayValue.length > 1 ? displayValue.slice(0, -1) : "0",
        );
    };

    const handleEqual = () => {
        if (operator && firstValue !== null) {
            const result = performCalculation(
                parseFloat(firstValue),
                parseFloat(displayValue),
                operator,
            );
            setDisplayValue(String(result));
            setFirstValue(null);
            setOperator(null);
            setWaitingForOperand(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const { key } = e;

        if (!isNaN(Number(key))) {
            inputDigit(key);
        } else if (key === ".") {
            inputDot();
        } else if (key === "+") {
            handleOperator("+");
        } else if (key === "-") {
            handleOperator("-");
        } else if (key === "*") {
            handleOperator("*");
        } else if (key === "/") {
            handleOperator("/");
        } else if (key === "%") {
            handleOperator("%");
        } else if (key === "Enter") {
            handleEqual();
        } else if (key === "Escape") {
            e.preventDefault();
            clearAll();
        } else if (key === "Backspace") {
            e.preventDefault();
            clearLastChar();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [displayValue, operator, firstValue]);

    return (
        <div className="mx-auto max-w-xs p-4">
            <div className="relative mb-4 rounded border bg-foreground/10 p-4 text-right text-3xl">
                <span className="absolute left-0 top-0 m-2 text-sm text-muted-foreground">
                    {operator}
                </span>
                {displayValue}
            </div>
            <div className="grid grid-cols-4 gap-2">
                <Button
                    variant={"default"}
                    onClick={clearAll}
                    className="h-auto p-4"
                >
                    AC
                </Button>
                <Button
                    variant={"default"}
                    onClick={clearLastChar}
                    className="h-auto p-4"
                >
                    C
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={() => handleOperator("%")}
                    className="h-auto p-4"
                >
                    %
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={() => handleOperator("/")}
                    className="h-auto p-4"
                >
                    /
                </Button>

                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("7")}
                    className="h-auto p-4"
                >
                    7
                </Button>
                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("8")}
                    className="h-auto p-4"
                >
                    8
                </Button>
                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("9")}
                    className="h-auto p-4"
                >
                    9
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={() => handleOperator("*")}
                    className="h-auto p-4"
                >
                    *
                </Button>

                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("4")}
                    className="h-auto p-4"
                >
                    4
                </Button>
                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("5")}
                    className="h-auto p-4"
                >
                    5
                </Button>
                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("6")}
                    className="h-auto p-4"
                >
                    6
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={() => handleOperator("-")}
                    className="h-auto p-4"
                >
                    -
                </Button>

                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("1")}
                    className="h-auto p-4"
                >
                    1
                </Button>
                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("2")}
                    className="h-auto p-4"
                >
                    2
                </Button>
                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("3")}
                    className="h-auto p-4"
                >
                    3
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={() => handleOperator("+")}
                    className="h-auto p-4"
                >
                    +
                </Button>

                <Button
                    variant={"outline"}
                    onClick={() => inputDigit("0")}
                    className="col-span-2 h-auto p-4"
                >
                    0
                </Button>
                <Button
                    variant={"outline"}
                    onClick={inputDot}
                    className="h-auto p-4"
                >
                    .
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={handleEqual}
                    className="h-auto p-4"
                >
                    =
                </Button>
            </div>
        </div>
    );
};

export default Calculator;
