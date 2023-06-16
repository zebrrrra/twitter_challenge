import axios from 'axios';
const baseUrl ='https://tranquil-basin-75437.herokuapp.com/api';


//POST /api/followships 追蹤使用者
export const postFollowShips= async (id)=>{ 
    const token = localStorage.getItem('token');  
    try{
        const response = await axios.post (`${baseUrl}/followships`,{id},
        {headers: {
          Authorization: `Bearer ${token}`//測試用要刪掉
        }}
          );
        return response.data;
    } catch (error){
        console.error ('Error:cannot post follow',error);
        return null;
    }
    };
//DELETE /api/followships/:followingId 刪除追蹤使用者
export const deleteFollowShips= async (followingId)=>{ 
    const token = localStorage.getItem('token');
    try{
        const response = await axios.delete (`${baseUrl}/followships/${followingId}`,
        {headers: {
          Authorization: `Bearer ${token}`//測試用要刪掉
        }}
          );
        return response.data;
    } catch (error){
        console.error ('Error:cannot unfollow',error);
        return null;
    }
    };