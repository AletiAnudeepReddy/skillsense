const ML_BASE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

/**
 * Generic helper to POST to ML service
 */
export async function postToML<T>(path: string, body: unknown): Promise<T> {
  try {
    const res = await fetch(`${ML_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`ML service error: ${res.status} ${text}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error(`[mlClient] Error calling ${path}:`, err);
    throw err;
  }
}

/**
 * Parse resume using ML service
 */
export async function parseResume(body: {
  fileUrl?: string | null;
  linkedinUrl?: string | null;
  rawText?: string | null;
}) {
  return postToML<{
    rawText: string;
    parsed: {
      name?: string;
      title?: string;
      summary?: string;
      skills: string[];
      experience: Array<{
        company: string;
        role: string;
        startDate?: string;
        endDate?: string;
        technologies?: string[];
      }>;
      education: Array<{
        institution: string;
        degree: string;
        year?: string;
      }>;
    };
  }>("/ml/resume/parse", body);
}

/**
 * Parse job description using ML service
 */
export async function parseJob(body: {
  jdText?: string | null;
  jdUrl?: string | null;
}) {
  return postToML<{
    rawText: string;
    parsed: {
      jobTitle: string;
      company?: string;
      location?: string;
      requiredSkills: string[];
      niceToHaveSkills: string[];
    };
  }>("/ml/job/parse", body);
}
