export default function ResumeForm({ data, setData }: { data: any; setData: (v: any) => void }) {
    return (
        <form className="space-y-4">
            <div>
                <label className="mb-1 block text-sm">Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-600"
                />
            </div>
            <div>
                <label className="mb-1 block text-sm">Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-600"
                />
            </div>
            <div>
                <label className="mb-1 block text-sm">Phone</label>
                <input
                    type="text"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-600"
                />
            </div>
        </form>
    );
}
