"use client";
import React from "react";
import { Location } from "@/components/LocationPicker";
import EditForm from "@/components/EditForm";

const locationdefault ={
  lat:13.55645,
  lng:56.97654
}
export default function NewAdPage() {
 
  return (
    <EditForm defaultLocation={locationdefault}/>
  );
}
