import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export default () => {
  let dir;
  try {
    dir = fs.readdirSync('./data/');
  } catch (err) {
    // No posts yet
    return [];
  }
  const posts = dir
    .filter((file) => path.extname(file) === '.md')
    .map((file) => {
      const postContent = fs.readFileSync(`./data/${file}`, 'utf8');
      const { data, content } = matter(postContent);

      if (data.published === false) {
        return null;
      }

      return { ...data, body: content, title: data.title };
    })
    .filter(Boolean)
    .sort((a, b) => (a.date > b.date ? '-1' : '1'));

  return posts;
};
