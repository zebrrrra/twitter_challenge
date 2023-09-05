import style from "./AdminAllTweet.module.scss"
import AdminTweetCard from '../AdminTweetCard/AdminTweetCard';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import { ClipLoader } from "react-spinners";
import { deleteAdminUserTweets } from '../../apis/admin';
import { useGetAdminAllTweetsQuery } from '../../hooks/QueryHook';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AdminAllTweets = () => {
    const { data, isLoading } = useGetAdminAllTweetsQuery()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (id) => {
            return await deleteAdminUserTweets(id);
        },
        onSuccess: (data) => {
            if (data.status === 'success') {
                queryClient.invalidateQueries({ queryKey: ['getAdminAllTweets'] })
                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    position: 'top',
                });
            }
        }
    })

    if (isLoading) {
        return <Skeleton count={6} className={style.skeleton} />
    }
    const handleOnDelete = async (id) => {
        if (mutation.isLoading) return
        Swal.fire({
            title: '你確定要刪除嗎?',
            text: '刪除後不可回復',
            icon: 'warning',
            showCancelButton: true,

        }).then(async (result) => {
            if (result.isConfirmed) {
                mutation.mutate(id);
            }
        })
    };

    const override = {
        position: 'fixed',
        top: '50%',
        left: '50%',
    };

    return <>
        <ClipLoader size={60} color='#cccccc' loading={mutation.isLoading} cssOverride={override} />
        {data?.map(allUsertweet => {
            if (!allUsertweet.User) {
                return null;
            }
            return <AdminTweetCard
                key={allUsertweet.id}
                tweet={allUsertweet}
                handleOnDelete={handleOnDelete}
                type="alltweet" />
        })}
    </>
};

export default AdminAllTweets;