export const Profile = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            User Information
          </h3>
          {/* <UpdateProfile /> */}
        </div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details of the user.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {/* <Entry label="First Name" value={user.data?.firstName ?? ''} />
          <Entry label="Last Name" value={user.data?.lastName ?? ''} />
          <Entry label="Email Address" value={user.data?.email ?? ''} />
          <Entry label="Role" value={user.data?.role ?? ''} />
          <Entry label="Bio" value={user.data?.bio ?? ''} /> */}
        </dl>
      </div>
    </div>
  );
};
