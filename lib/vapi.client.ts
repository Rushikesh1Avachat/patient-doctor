import { VapiClient } from "@vapi-ai/server-sdk";

const vapi = new VapiClient({ token: process.env.VAPI_API_PUBLIC_KEY! });

async function createAppointmentWorkflow() {
  try {
    // Create workflow with initial greeting node
    //@ts-ignore
    const workflow = await vapi.workflow.create({
      name: "Barbershop Appointment Workflow",
      nodes: [
        {
          id: "greeting",
          type: "conversation",
          firstMessage: "Hello! Thank you for calling Tony's Barbershop. This is Sarah, your booking assistant. I can help you schedule, reschedule, or cancel appointments. How can I help you today?",
          systemPrompt: "You are Sarah, the friendly booking assistant for Tony's Barbershop. Listen to the customer's response and determine their intent: schedule, reschedule, cancel, status, or other. Keep responses under 35 words.",
          extractVariables: [
            {
              name: "intent",
              type: "string", 
              description: "The customer's primary intent",
              enum: ["schedule", "reschedule", "cancel", "status", "other"]
            }
          ]
        }
      ],
      edges: []
    });

    console.log(`Workflow created with ID: ${workflow.id}`);
    return workflow;
  } catch (error) {
    console.error('Error creating workflow:', error);
    throw error;
  }
}

// Create the appointment workflow
const workflow = await createAppointmentWorkflow();
