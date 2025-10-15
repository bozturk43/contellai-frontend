import { Card, CardHeader, CardContent, Skeleton } from '@mui/material';

const PostCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 345, width: '100%' }}>
      {/* Kartın başlık (Header) bölümünün iskeleti */}
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      {/* Görselin yerini tutacak olan iskelet */}
      <Skeleton sx={{ height: 345 }} animation="wave" variant="rectangular" />
      {/* İçerik metninin yerini tutacak iskelet */}
      <CardContent>
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </>
      </CardContent>
    </Card>
  );
};

export default PostCardSkeleton;