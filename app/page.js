"use client";

import { useState } from "react";

export default function Home() {
  const [daiValue, setDaiValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateDaiValue = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/calculate");
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const