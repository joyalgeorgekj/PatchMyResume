const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Privacy Policy for PatchMyResume
            </h1>
            <p className="mb-8 text-center text-sm text-gray-500">Last Updated: October 20, 2025</p>

            <p className="mb-6">
                This Privacy Policy for <span>PatchMyResume</span> (the "Service") explains how we
                collect, use, and protect your information. We are committed to transparency and
                ensuring the security of the data you entrust to us, especially your resume details
                and API keys.
            </p>

            {/* --- 1. Data Collection and Usage --- */}
            <section className="mb-8">
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                    1. Data Collection and Usage
                </h2>
                <p className="mb-4">
                    We collect information strictly necessary to provide the resume tailoring
                    service.
                </p>

                <h3 className="mb-3 text-xl font-medium">A. Information You Provide and Store</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                >
                                    Data Type
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                >
                                    Purpose of Collection
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                >
                                    Retention
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            <tr className="dark:bg-gray-800">
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                    <span>User Account Data</span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    To authenticate and maintain a secure user session via{' '}
                                    <span>NextAuth</span> and <span>Appwrite</span>.
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
                                    Retained for the duration of your account.
                                </td>
                            </tr>
                            <tr className="dark:bg-gray-800">
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                    <span>User Resume Data</span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    To generate, store, and modify your structured resume content
                                    for the tailoring process.
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
                                    Stored securely in the <span>Appwrite DB</span> until you delete
                                    it.
                                </td>
                            </tr>
                            <tr className="dark:bg-gray-800">
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                    <span>Google Gemini API Key</span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    To access the Gemini AI service and perform tailoring requests
                                    on your behalf (see Security below).
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
                                    Stored <span>hashed</span> in the <span>Appwrite DB</span>.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-6 mb-3 text-xl font-medium">B. Data Not Collected or Stored</h3>
                <p className="mb-4">
                    The Service is designed to minimize data retention. The following sensitive data
                    is <span>never stored</span> on our servers:
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                        <span>Job Description:</span> Used as input for a single, immediate AI
                        tailoring request. It is processed in temporary state memory for the AI
                        request and then <span>discarded</span>.
                    </li>
                    <li>
                        <span>AI Suggestions:</span> Temporary suggestions generated by the AI are{' '}
                        <span>discarded</span> after you make your selection or navigate away.
                    </li>
                    <li>
                        <span>Final PDF Resume:</span> The PDF is generated <span>client-side</span>{' '}
                        (in your browser) and downloaded directly to your local device. We{' '}
                        <span>do not store a copy</span> of your final resume.
                    </li>
                </ul>
            </section>

            {/* --- 2. How Your Data is Handled and Secured --- */}
            <section className="mb-8">
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                    2. How Your Data is Handled and Secured
                </h2>
                <p className="mb-4">
                    We prioritize the security and privacy of sensitive information.
                </p>

                <h3 className="mb-3 text-xl font-medium">A. API Key Protection</h3>
                <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                        Your Gemini API key is immediately <span>hashed</span> using cryptographic
                        functions before being stored in the <span>Appwrite DB</span>.
                    </li>
                    <li>
                        The key is only used <span>server-side</span> to make direct, authenticated
                        calls to the Gemini API, ensuring it never leaves the server-side logic in
                        an unencrypted state.
                    </li>
                    <li>
                        <span>You control the usage and costs</span> associated with your API key,
                        as it is solely provided by and belongs to you.
                    </li>
                </ul>

                <h3 className="mt-6 mb-3 text-xl font-medium">B. AI Processing and Data Flow</h3>
                <p>
                    The AI tailoring process is a direct interaction: Your <span>Resume Data</span>{' '}
                    and the <span>Job Description</span> are securely transmitted to the{' '}
                    <span>Google Gemini API</span> to fulfill the request you initiated, and the
                    results are presented directly back to you. The request data is{' '}
                    <span>not retained</span> after the transaction is complete.
                </p>
            </section>

            {/* --- 3. Data Sharing and Disclosure --- */}
            <section className="mb-8">
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                    3. Data Sharing and Disclosure
                </h2>
                <p className="mb-4">
                    We <span>do not sell or rent</span> your personal or resume data to third
                    parties.
                </p>
                <p>
                    Your data is shared only under the following strictly necessary circumstances:
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                        <span>AI Service (Google Gemini):</span> Sharing your{' '}
                        <span>Resume Data</span> and <span>Job Description</span> is necessary to
                        fulfill the tailoring service you explicitly request.
                    </li>
                    <li>
                        <span>Service Providers (Appwrite):</span> Used for secure storage of your
                        account and structured resume data.
                    </li>
                    <li>
                        <span>Legal Requirements:</span> If required to do so by law or in the good
                        faith belief that such action is necessary to comply with legal processes or
                        protect the rights and safety of the Service or its users.
                    </li>
                </ul>
            </section>

            {/* --- 4. Your Rights and Choices --- */}
            <section className="mb-8">
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                    4. Your Rights and Choices
                </h2>
                <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                        <span>Access and Modification:</span> You can access and update your resume
                        data and API key information at any time through your user dashboard.
                    </li>
                    <li>
                        <span>Data Deletion:</span> You can delete your account and all associated
                        data, including your stored Resume Data and Hashed API Key, by following the
                        deletion process within the application settings.
                    </li>
                </ul>
            </section>

            {/* --- 5. Contact Information --- */}
            <section>
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                    5. Contact Information
                </h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact the project
                    maintainers through the provided channels on the main project repository.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
